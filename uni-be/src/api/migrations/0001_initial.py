# Generated by Django 4.1.7 on 2023-04-22 10:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('description', models.CharField(max_length=512)),
                ('fee', models.IntegerField()),
                ('size', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('cnp', models.BigIntegerField()),
                ('date_of_birth', models.DateField()),
                ('country', models.CharField(max_length=64)),
                ('mail_address', models.CharField(max_length=128)),
                ('phone_number', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('cnp', models.BigIntegerField()),
                ('date_of_birth', models.DateField()),
                ('mail_address', models.CharField(max_length=128)),
                ('phone_number', models.CharField(max_length=10)),
                ('description', models.CharField(default='-', max_length=5012)),
            ],
        ),
        migrations.CreateModel(
            name='StudentCourse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('final_lab_score', models.DecimalField(decimal_places=2, default=0, max_digits=4)),
                ('final_exam_score', models.DecimalField(decimal_places=2, default=0, max_digits=4)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.course')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.student')),
            ],
        ),
        migrations.AddField(
            model_name='student',
            name='courses',
            field=models.ManyToManyField(through='api.StudentCourse', to='api.course'),
        ),
        migrations.AddField(
            model_name='course',
            name='students',
            field=models.ManyToManyField(through='api.StudentCourse', to='api.student'),
        ),
        migrations.AddField(
            model_name='course',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='courses', to='api.teacher'),
        ),
    ]