---
description: "Azure DevOps workflow conventions for branching, commits, and PR linking"
applyTo: "**"
---

# Azure DevOps Workflow Conventions

These conventions ensure consistent integration between code changes and Azure DevOps work items. Follow them for all branches, commits, and pull requests.

## Branch Naming Convention

Create feature branches using the work item ID and a short description.

Pattern: `feature/{work-item-id}-{short-description}`

Examples:

```text
feature/123-add-program-api
feature/456-fix-validation-error
feature/789-update-notification-template
```

Rules:

* Use lowercase for the description
* Separate words with hyphens
* Keep descriptions concise (2-4 words)
* Always include the work item ID

## Commit Message Format

Link commits to work items using the `AB#` prefix.

Pattern: `AB#{work-item-id}: {imperative-description}`

Examples:

```text
AB#123: Add POST endpoint for program submission
AB#456: Fix null reference in validation service
AB#789: Update email template for French locale
```

Rules:

* Start description with an imperative verb (Add, Fix, Update, Remove, Refactor)
* Do not end with a period
* Keep the entire message under 72 characters
* One work item per commit message

## PR Title Format

Use the same format as commit messages for PR titles.

Pattern: `AB#{work-item-id}: {description}`

Examples:

```text
AB#123: Add program submission API
AB#456: Fix validation error handling
AB#789: Implement notification preferences
```

## PR Body Requirements

Include work item linking keywords in the PR body to enable auto-close on merge.

Required keyword: `Fixes AB#{id}` or `Closes AB#{id}`

PR body template:

```markdown
## Description

Brief description of the changes and their purpose.

Fixes AB#123

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility verified

## Checklist

- [ ] Code follows project conventions
- [ ] No new warnings introduced
- [ ] Documentation updated if needed
```

Auto-close keywords:

* `Fixes AB#{id}` - Closes the work item when PR merges
* `Closes AB#{id}` - Same behavior as Fixes
* `Resolves AB#{id}` - Same behavior as Fixes

## Post-Merge Cleanup

Complete these steps after a PR is merged:

1. **Delete the feature branch** - Remove the remote branch after merge to keep the repository clean
2. **Verify work item state** - Confirm the linked work item transitioned to Done or Closed
3. **Update local repository** - Pull the latest changes from the main branch
4. **Remove local feature branch** - Delete the local copy of the merged branch

Cleanup commands:

```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Delete local feature branch
git branch -d feature/123-add-program-api

# Prune remote tracking branches
git fetch --prune
```
