---
description: Prepare a version bump and release notes for review.
disable-model-invocation: true
---

Read the current version, working tree and branch. Ask for the intended version and release summary if not given. Check whether this is the template itself or a derived project; do not assume either has the template landing-page changelog.

Prepare the changelog and version metadata, updating the npm lockfile consistently (for example `npm version <version> --no-git-tag-version` after confirming the intended version). Update any displayed version only if the project actually maintains it. Run lint, one-shot tests and build; report failures.

Show the diff, exact proposed commit, target branch and tag. Do not commit unrelated changes. Creating a tag, pushing a branch, publishing a release or deploying requires the user's explicit instruction for that action. Never assume `main`, force push, or hardcode model attribution. A Git tag is not itself a GitHub release.
