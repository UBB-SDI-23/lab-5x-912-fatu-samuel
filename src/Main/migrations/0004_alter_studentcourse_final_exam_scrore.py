# Generated by Django 4.1.7 on 2023-03-18 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Main', '0003_alter_course_teacher_studentcourse_course_students_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentcourse',
            name='final_exam_scrore',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=4),
        ),
    ]
