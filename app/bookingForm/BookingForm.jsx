import { useState } from 'react';
export default function BookingForm()
{
    const [mode,setMode]=useState('class');
    const [teacher,setTeacher]=useState('');
    const [subject,setSubject]=useState('');
    const [studentRoom,setStudentRoom]=useState('');
    const [activityDetail,setActivityDetail]=useState('');
    
    const handleSubmit = () =>
    {
        if(mode==='class')
        {
            console.log({teacher,subject,studentRoom});
        }
        else
        {
            console.log({activityDetail});
        }
    }

    return (
        <div className="bg-white p-6 rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300">
            <h2 className="text-xl font-bold text-center mb-2">ห้อง 1303</h2>
            <p className="text-center mb-4">คาบ 1 (08.30-09.20)</p>
            
            <div className="flex justify-center mb-4 text-sm font-medium space-x-6">
                <span
                    className={`cursor-pointer ${
                        mode==='class' ? 'underline underline-offset-4 text-blue-600 font-semibold' : 'text-gray-500'
                    }`}
                    onClick={()=>setMode('class')}
                >การเรียนการสอน</span>
                <span
                    className={`cursor-pointer ${
                        mode==='activity' ? 'underline underline-offset-4 text-blue-600 font-semibold' : 'text-gray-500'
                    }`}
                    onClick={()=>setMode('activity')}
                >กิจกรรม</span>
            </div>

            {mode==='class' ? (
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">ครูผู้สอน</label>
                        <select
                            className="w-full border px-3 py-2 rounded appearance-none bg-white bg-no-repeat pr-8"
                            value={teacher}
                            onChange={(e)=>setTeacher(e.target.value)}
                            style={{
                                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
        backgroundPosition: 'right 0.5rem center',
                                backgroundPosition:'right 0.5rem center',
                                backgroundSize:'1rem',
                            }}
                        >
                            <option value="">เลือกครู</option>
                            <option value="ครูสมชาย">ครูสมชาย</option>
                            <option value="ครูสมศรี">ครูสมศรี</option>
                            <option value="ครูแจ่มใส">ครูแจ่มใส</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">วิชา</label>
                        <select
                            className="w-full border px-3 py-2 rounded appearance-none bg-white bg-no-repeat pr-8"
                            value={subject}
                            onChange={(e)=>setSubject(e.target.value)}
                            style={{
                                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
        backgroundPosition: 'right 0.5rem center',
                                backgroundPosition:'right 0.5rem center',
                                backgroundSize:'1rem',
                            }}
                        >
                            <option value="">เลือกวิชา</option>
                            <option value="ฟิสิกส์">ฟิสิกส์</option>
                            <option value="เคมี">เคมี</option>
                            <option value="ชีวะ">ชีวะ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">ห้องที่สอน</label>
                        <select
                            className="w-full border px-3 py-2 rounded appearance-none bg-white bg-no-repeat pr-8"
                            value={studentRoom}
                            onChange={(e)=>setStudentRoom(e.target.value)}
                            style={{
                                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
        backgroundPosition: 'right 0.5rem center',
                                backgroundPosition:'right 0.5rem center',
                                backgroundSize:'1rem',
                            }}
                        >
                            <option value="">เลือกห้องนักเรียน</option>
                            <option value="ม.1.1">ม.1.1</option>
                            <option value="ม.1.2">ม.1.2</option>
                            <option value="ม.1.3">ม.1.3</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div>
                    <label className="block font-semibold mb-1">รายละเอียด</label>
                    <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                    placeholder="ประเภทกิจกรรมที่จะทำ..."
                    value={activityDetail}
                    onCharnge={(e)=>setActivityDetail(e.target.value)}/>
                </div>
            )}

            <button
                className="mt-6 w-full py-2 rounded-full bg-gradient-to-r from-yellow-200 to-pink-200 shadow-md font-semibold"
                onClick={handleSubmit}
            >ยืนยันการจอง</button>
        </div> 
    );
}