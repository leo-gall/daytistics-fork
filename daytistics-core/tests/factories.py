import factory
from datetime import timedelta
from faker import Faker
from factory.django import DjangoModelFactory
from django.utils import timezone
from app.users.models import CustomUser
from app.daytistics.models import Daytistic
from app.diary.models import DiaryEntry
from app.wellbeing.models import WellbeingEntry, WellbeingType
from app.activities.models import ActivityType, ActivityEntry

fake = Faker()


class ActivityTypeFactory(DjangoModelFactory):
    class Meta:
        model = ActivityType

    name = factory.LazyFunction(lambda: fake.word())


class CustomUserFactory(DjangoModelFactory):
    class Meta:
        model = CustomUser

    username = factory.LazyFunction(lambda: fake.user_name())
    email = factory.LazyFunction(lambda: fake.email())
    password = factory.PostGenerationMethodCall("set_password", "password123")
    is_active = True
    last_login = None

    @factory.post_generation
    def activities(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            # Füge Benutzer-Aktivitäten hinzu
            for activity in extracted:
                self.activities.add(activity)


class DiaryEntryFactory(DjangoModelFactory):
    class Meta:
        model = DiaryEntry

    entry = factory.LazyFunction(lambda: fake.text())
    moment = factory.LazyFunction(lambda: fake.sentence())


class DaytisticFactory(DjangoModelFactory):
    class Meta:
        model = Daytistic

    user = factory.SubFactory(CustomUserFactory)
    date = factory.LazyFunction(timezone.now)

    @factory.post_generation
    def activities(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            # Füge Aktivitäten zum Daytistic hinzu
            for activity in extracted:
                self.activities.add(activity)

    @factory.post_generation
    def wellbeings(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            # Füge Wellbeing Entries hinzu
            for wellbeing in extracted:
                self.wellbeings.add(wellbeing)


class ActivityEntryFactory(DjangoModelFactory):
    class Meta:
        model = ActivityEntry

    daytistic = factory.SubFactory(DaytisticFactory)
    type = factory.SubFactory(ActivityTypeFactory)
    start_time = factory.LazyFunction(lambda: timezone.now() - timedelta(hours=2))
    end_time = factory.LazyFunction(lambda: timezone.now())


class WellbeingEntryFactory(DjangoModelFactory):
    class Meta:
        model = WellbeingEntry

    daytistic = factory.SubFactory(DaytisticFactory)
    type = factory.SubFactory(ActivityTypeFactory)
    rating = factory.LazyFunction(lambda: fake.random_int(min=1, max=10))