from reactpy import web

mui = web.module_from_template(
    "react",
    "@mui/material",
    fallback="please wait, loading..."
)

Box = web.export(mui, "Box")
Button = web.export(mui, "Button")
Chip = web.export(mui, "Chip")
FormControl = web.export(mui, "FormControl")
Grid = web.export(mui, "Grid")
InputLabel = web.export(mui, "InputLabel")
MenuItem = web.export(mui, "MenuItem")
Select = web.export(mui, "Select")
Switch = web.export(mui, "Switch")
TextField = web.export(mui, "TextField")
Typography = web.export(mui, "Typography")
