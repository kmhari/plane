# Django imports
from django.db import models

# Module imports
from plane.db.models import Issue, Project

class IssueProgressHistory(models.Model):

    issue = models.ForeignKey(
        Issue, related_name="issue_progress_history", on_delete=models.CASCADE
    )

    started_at = models.FloatField(null=True)
    ended_at = models.FloatField(null=True)
    duration = models.SmallIntegerField()


class IssueTimeConsumed(models.Model):

    issue = models.ForeignKey(
        Issue, related_name="issue_time_consumed", on_delete=models.CASCADE
    )

    project = models.ForeignKey(
        Project, related_name="issue_time_consumed", on_delete=models.CASCADE
    )
    
    duration = models.SmallIntegerField(default=0)
