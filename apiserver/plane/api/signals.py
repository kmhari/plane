from django.db.models.signals import *
from django.dispatch import receiver
from plane.db.models import IssueActivity, Issue
import time

@receiver(post_save, sender=IssueActivity)
def calculate_consumed_hours(instance, created, **kwargs):

    try:
        print("New State : {}".format(instance.old_value))
        issue_id = instance.issue_id
        if created and instance.field == 'state' and instance.old_value == 'In Progress':
            issue = Issue.objects.get(pk=issue_id)
            obj = IssueActivity.objects.filter(issue_id = issue_id, new_value='In Progress').last()
            issue.time_consumed = issue.time_consumed + int(((int(time.time()) - obj.epoch) / 60))
            issue.save()
            print("Time Consumed updated to {} for Issue {}".format(issue.time_consumed, instance.issue_is))
    except Exception as e:
        print("Exception {} occured in consumed hours.".format(str(e)))


