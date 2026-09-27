import {
    PhoneIcon,
    WhatsAppIcon,
    TelegramIcon,
    LocationIcon,
    ClockIcon,
} from "../icons";

const appointmentData = {

    title: "رزرو نوبت",

    subtitle:
        "برای دریافت نوبت، از یکی از روش‌های زیر با مطب در ارتباط باشید.",

    cards: [

        {
            id: 1,
            icon: PhoneIcon,
            title: "تلفن مطب",
            value: "021-88650501",
            href: "tel:021-88650501",
        },

        {
            id: 2,
            icon: PhoneIcon,
            title: "تلفن همراه",
            value: "09051840077",
            href: "tel:09051840077",
        },

        {
            id: 3,
            icon: WhatsAppIcon,
            title: "واتساپ",

            value: "ارسال پیام جهت رزرو",

            href: "https://wa.me/09051840077",
        },

        {
            id: 4,
            icon: TelegramIcon,
            title: "تلگرام",

            value: "@doctorzaferani",

            // href: "https://t.me/doctor",
        },

        {
            id: 5,
            icon: LocationIcon,

            title: "آدرس مطب",

            value:
                "تهران، خیابان ولیعصر(عج) - بالاتر از ظفر - ابتدای بلوار اسفندیار - شماره96- کلینیک فوق تخصصی چشم پزشکی نور",

            href:
                "https://maps.google.com",
        },

        {
            id: 6,
            icon: ClockIcon,

            title: "ساعات حضور",

            value:
                "شنبه تا چهارشنبه\n16:00 الی 20:00",

            href: null,
        },

    ],

};

export default appointmentData;