#!/usr/bin/env python3
import os
import re
import subprocess
import sys

def git_changed_files(base, head):
    cmd = ["git", "diff", "--name-only", f"{base}", f"{head}"]
    out = subprocess.check_output(cmd, text=True).strip()
    return [l for l in out.splitlines() if l]

def needs_evidence(path):
    # Only check Markdown files in specs, .specify templates, docs/FASE* and kpc-spec-kit docs
    patterns = [r"^specs/.*\.md$", r"^\.specify/.*\.md$", r"^kpc-spec-kit/docs/FASE.*\.md$", r"^kpc-spec-kit/docs/.*\.md$", r"^docs/FASE.*\\.md$"]
    for p in patterns:
        if re.match(p, path):
            return True
    return False

def file_has_evidence(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            text = f.read()
    except Exception:
        return False
    # Case-insensitive search for 'Evidência' or 'Evidências' or 'Evidences'
    return bool(re.search(r"eviden[cç]as?|evidence", text, re.IGNORECASE))

def main():
    base = os.environ.get("BASE_SHA")
    head = os.environ.get("HEAD_SHA")
    if not base or not head:
        print("BASE_SHA or HEAD_SHA not provided. Skipping validation.")
        return 0

    files = git_changed_files(base, head)
    missing = []
    for f in files:
        if needs_evidence(f) and f.endswith(".md"):
            if not file_has_evidence(f):
                missing.append(f)

    if missing:
        print("Protocol validation failed. The following files are missing evidence sections:")
        for m in missing:
            print(f" - {m}")
        print("\nPlease add an 'Evidências' section with commit IDs, issue links and sprint reference to each file, or mark the change as non-functional in the PR description.")
        return 2

    print("Protocol validation passed: all relevant markdown files contain evidence sections (if changed).")
    return 0

if __name__ == '__main__':
    sys.exit(main())
