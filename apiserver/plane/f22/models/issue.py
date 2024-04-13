# Django imports
from django.db import models

# Module imports
from plane.db.models import Issue

class IssueProgressHistory(models.Model):

    issue = models.ForeignKey(
        Issue, related_name="issue_progress_history", on_delete=models.CASCADE
    )

    started_at = models.FloatField(null=True)
    ended_at = models.FloatField(null=True)
    duration = models.SmallIntegerField()
