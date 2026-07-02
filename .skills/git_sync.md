# Skill: Git Sync & Release

**Description**: Automates the process of versioning, updating the changelog, and pushing to GitHub after significant changes.

## Trigger
When the user asks to "push to github", "update the changelog", "release a new version", or "sauvegarde sur github avec le changelog".

## Instructions for the AI Agent:
1. **Analyze Changes**: Look at the git status and the recent modifications you've made.
2. **Determine Version Bump**: Decide if the changes warrant a patch (bug fixes), minor (new features), or major (breaking changes) version bump.
3. **Update CHANGELOG.md**:
   - Add a new section at the top of the `CHANGELOG.md` file with the new version number and today's date.
   - Summarize the changes under `### Added`, `### Changed`, `### Fixed`, etc.
4. **Update package.json**: (If applicable) Increment the version number in `package.json`.
5. **Commit and Push**:
   - Run `git add .`
   - Run `git commit -m "chore: release vX.Y.Z - <short summary>"`
   - Run `git push`
6. **Report**: Inform the user that the code has been safely pushed to GitHub along with the changelog.
