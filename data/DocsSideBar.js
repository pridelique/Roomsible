import DocsBooking from "@components/docs_components/DocsBooking"
import DocsBookingCondition from "@components/docs_components/DocsBookingCondition"
import DocsCancel from "@components/docs_components/DocsCancel"
import DocsCheckin from "@components/docs_components/DocsCheckin"
import DocsCheckinCondition from "@components/docs_components/DocsCheckinCondition"
import DocsContactUs from "@components/docs_components/DocsContactUs"
import DocsFAQ from "@components/docs_components/DocsFAQ"
import DocsLogin from "@components/docs_components/DocsLogin"
import DocsPenalty from "@components/docs_components/DocsPenalty"

const DocsSideBarList = [
    {
        title: 'การเข้าสู่ระบบ',
        id: 'login',
        content: <DocsLogin />
    },
    {
        title: 'การจองห้อง',
        id: 'booking',
        content: <DocsBooking />
    },
    {
        title: 'เงื่อนไขการจองห้อง',
        id: 'booking-condition',
        content: <DocsBookingCondition />
    },
    {
        title: 'การเช็คอิน',
        id: 'checkin',
        content: <DocsCheckin />
    },
    {
        title: 'เงื่อนไขการเช็คอิน',
        id: 'checkin-condition',
        content: <DocsCheckinCondition />
    },
    {
        title: 'ยกเลิกการจอง',
        id: 'cancel',
        content: <DocsCancel />
    },
    {
        title: 'บทลงโทษ',
        id: 'penalty',
        content: <DocsPenalty />
    },
    {
        title: 'คำถามที่พบบ่อย',
        id: 'faq',
        content: <DocsFAQ />
    },
    {
        title: 'ติดต่อเรา',
        id: 'contact-us',
        content: <DocsContactUs />
    }
]

const hashToTitle = {
    'login': 'เข้าสู่ระบบ',
    'booking': 'จองห้อง',
    'booking-condition': 'เงื่อนไขการจองห้อง',
    'checkin': 'เช็คอิน',
    'checkin-condition': 'เงื่อนไขการเช็คอิน',
    'cancel': 'ยกเลิกการจอง',
    'faq': 'คำถามที่พบบ่อย',
    'penalty': 'บทลงโทษ'
}

export { DocsSideBarList, hashToTitle }