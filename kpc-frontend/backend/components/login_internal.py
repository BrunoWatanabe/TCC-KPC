from reactpy import component, html, use_state, event
from reactpy.html import \
    input, label, button, form, br
from aiohttp import ClientSession
from reactpy import run
from reactpy_router import route, browser_router
from datetime import datetime, timedelta, timezone
from jose import jwt
from enum import Enum
from keyphrase_curation.controller.user_attribution \
    import UserAttributionController
from keyphrase_curation import config


class LoginStatus(Enum):
    OK = "Login OK"
    ERROR = "Login Error"


class TokenController:
    token_database = []

    @staticmethod
    def save(token):
        TokenController.token_database.append(token)

    @staticmethod
    def validate(token):
        # TODO: check timestamp, user, etc
        if token in TokenController.token_database:
            return True
        return False

    @staticmethod
    def remove(token):
        TokenController.token_database.remove(token)

    @staticmethod
    def refresh(token):
        ...


@component
def check_auth(Component, token_type="bearer"):
    valid_token, set_valid_token = use_state(False)

    def token_loaded(event):
        # Do something here that verifies whether the token is valid
        token = event["target"]["value"]
        valid = TokenController.validate(token)
        if valid:
            set_valid_token(True)

    if token_type == "bearer":
        script = """
            let value = window.sessionStorage.getItem('access_token');
            let target = document.getElementById('sessionStorageToken')
            target.setAttribute('value', value);
            target.dispatchEvent(new Event('load'));
        """
    elif token_type == "cookie":
        ...
    else:
        raise Exception("Invalid token type")

    return html.div(
        Component() if valid_token else "",
        LoginError() if not valid_token else "",
        html.input(
            {"hidden": True,
             "id": "sessionStorageToken",
             "on_load": token_loaded},
        ),
        html.script(script),
    )


@component
def App():
    title = html.h1("Aplicação")
    script = '''
        function printTokens() {
            const access_token = window.sessionStorage.getItem("access_token");
            const refresh_token = window.localStorage.getItem("refresh_token");
            window.alert(
                `Access Token: ${access_token}\n
                Refresh Token: ${refresh_token}`);
        }
        function logout() {
            window.sessionStorage.removeItem("access_token");
            window.localStorage.removeItem("refresh_token");
            window.location.href = "/login_token";
        }
        let tokensButton = document.getElementById("tokensButton");
        tokensButton.addEventListener("click", printTokens);
        let logoutButton = document.getElementById("logoutButton");
        logoutButton.addEventListener("click", logout);
    '''
    header = html.header(
        html.script(script)
    )
    return html._(
        header,
        title,
        html.button(
            {"id": "tokensButton"},
            "Print Tokens"
        ),
        html.button(
            {"id": "logoutButton"},
            "Logout"
        )
    )


@component
def LoginError():
    return html.div(
        html.h1("Login Error")
    )


def internal_authentication(username, password):
    try:
        uac = UserAttributionController()
        response = uac.validate_password(
            user=username, plain_password=password) #get_validate_password
        if response:
            user = {'username': username}
        else:
            user = None
        return user
    except Exception as e:
        raise e


async def cookie_authentication(username, password,
                                base_url="http://api.local",
                                path="/external/cookie"):
    try:
        form_data: dict = {
            "username": username,
            "password": password
        }
        async with ClientSession(base_url=base_url) as session:
            async with session.post(
                url=path,
                data=form_data,
                headers={"content-type": "application/x-www-form-urlencoded"}
            ) as resp:
                return resp
    except Exception as e:
        raise e


def create_access_token(username):
    minutes = config['ACCESS_TOKEN_EXPIRE_MINUTES']
    expires_delta = timedelta(minutes=int(minutes))
    data = {"sub": username}
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        config['SECRET_KEY'],
        config['SECURITY_ALGORITHM'])
    return encoded_jwt


def create_tokens(user):
    username = user['username']
    access_token = create_access_token(username=username)
    return {
        "token_type": "bearer",
        "access_token": access_token
    }


def create_cookie(resp):
    return {
        "token_type": "cookie",
        "cookie": resp.headers['Set-Cookie']
    }


async def token_authentication(username, password):
    try:
        user = internal_authentication(username, password)
        if user is None:
            raise Exception("Not authenticated")
        return create_tokens(user)
    except Exception as e:
        raise e


async def api_authentication(username, password):
    try:
        resp = await cookie_authentication(username, password)
        if 'Set-Cookie' in resp.headers:
            return create_cookie(resp)
        raise Exception("Not authenticated")
    except Exception as e:
        raise e


@component
def Login(authentication=token_authentication):
    auth_token, set_auth_token = use_state("")
    login_status, set_login_status = use_state("")

    @event(prevent_default=True)
    async def on_submit(event):
        try:
            username = f"{event['target']['elements'][0]['value']}"
            password = f"{event['target']['elements'][1]['value']}"
            auth_token = await authentication(username, password)
            set_auth_token(auth_token)
            set_login_status(LoginStatus.OK.name)
        except Exception as e:
            print("Exception: ", str(e))
            set_login_status(LoginStatus.ERROR.name)
            return

    def login_form(login_status=""):
        header = html.header("")
        title = html.h1("Login")
        if login_status == LoginStatus.ERROR.name:
            header = html.header(
                html.script(
                    'window.location.href = "/login_error";'
                )
            )
        elif login_status == LoginStatus.OK.name:
            if auth_token['token_type'] == "bearer":
                access_token = auth_token['access_token']
                set_access_token = 'sessionStorage.setItem(' \
                    f'"access_token", "{access_token}");'
                TokenController.save(access_token)
                decoded_token = jwt.decode(access_token, config['SECRET_KEY'])
                username = decoded_token['sub']
                set_window_location = \
                    f'window.location.href = "/keyphrase_curation/{username}";'
                script = \
                    f'{set_access_token}'\
                    f'{set_window_location}'
                header = html.header(html.script(script))
            elif auth_token['token_type'] == "cookie":
                cookie = auth_token['cookie']
                cookie1 = cookie.replace('"', '\\"')
                cookie2 = cookie1.replace('HttpOnly; ', '')
                script = f'document.cookie="{cookie2}";' \
                    f'window.location.href = "/app";'
                header = html.header(html.script(script))
        return html._(
            header,
            title,
            form(
                {
                    "onSubmit": on_submit
                },
                label("Username: "),
                input({
                    "type": "text",
                    "name": "username",
                }),
                br(),
                label("Password: "),
                input({
                    "type": "password",
                    "name": "password",
                }),
                br(),
                button({
                    "name": "login",
                    "value": "Login",
                    "type": "submit"
                }, "Login")
            )
        )

    return html.div(
        login_form(login_status=login_status)
    )


@component
def Root():
    return browser_router(
        route("/login_token", Login(token_authentication)),
        route("/login_cookie", Login(api_authentication)),
        route("/login_error", LoginError()),
        route("/app", check_auth(App)),
        route("*", html.h1("Missing Link 🔗‍💥"))
    )


if __name__ == "__main__":
    run(Root)
