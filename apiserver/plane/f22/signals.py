from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from ..db.models.issue import Issue, IssueActivity
from .models.issue import IssueProgressHistory

@receiver(pre_save, sender=IssueActivity)
@receiver(pre_save, sender=IssueProgressHistory)
def set_old_instance(sender, instance, **kwargs):
    """
    - if old instance of any model needed in post_save signal, just decorate this method
    - example : @receiver(pre_save, sender=RequiredModel)
    """
    try:
        instance.old_instance = sender.objects.get(id=instance.id)
    except:
        instance.old_instance = None


@receiver(post_save, sender=IssueActivity)
def create_issue_progress_history(sender, instance, created, **kwargs):

    print("State Receiver Invoked")

    if not created:
        return

    try:
        if instance.field == 'state':
            issue_id = instance.issue_id
            project_id = instance.project_id
            issue = Issue.objects.get(pk=issue_id, project_id = project_id)

            previous_activity = IssueActivity.objects.filter(issue_id = issue_id, project_id = project_id, field = 'state').exclude(id=instance.id).order_by('epoch').last()

            if previous_activity.old_value == 'In Progress':
                duration = issue.time_consumed + int(((instance.epoch - previous_activity.epoch) / 60))
                issue.time_consumed = duration
                issue.save()

                print("Updated duration: {}".format(duration))

                IssueProgressHistory.objects.create(issue_id=issue_id, started_at=previous_activity.epoch, ended_at=instance.epoch, duration=duration)

    except sender.DoesNotExist:
        pass

default_app_config = "plane.f22.apps.ApiConfig"
