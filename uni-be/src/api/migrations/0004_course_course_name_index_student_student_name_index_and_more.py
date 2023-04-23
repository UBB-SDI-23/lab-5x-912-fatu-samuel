# Generated by Django 4.1.7 on 2023-04-23 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_student_course_index_studentcourse_both_index_and_more'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='course',
            index=models.Index(fields=['name'], name='course_name_index'),
        ),
        migrations.AddIndex(
            model_name='student',
            index=models.Index(fields=['name'], name='student_name_index'),
        ),
        migrations.AddIndex(
            model_name='teacher',
            index=models.Index(fields=['name'], name='teacher_name_index'),
        ),
    ]