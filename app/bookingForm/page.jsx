'use client'
import { useState } from 'react';
import Select from 'react-select';
import '../globals.css';
function BookingForm()
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
    const teacherList=['ครูสมชาย','ครูสมศรี','ครูแจ่มใส']; 
    const teacherOptions=teacherList.map(name=>({
    value:name,
    label:name,
    }));
    const subjectOptions=[
    {value:'ฟิสิกส์',label:'ฟิสิกส์'},
    {value:'เคมี',label:'เคมี'},
    {value:'ชีวะ',label:'ชีวะ'},
    ];
    const roomOptions=[
    {value:'ม.1.1',label:'ม.1.1'},
    {value:'ม.1.2',label:'ม.1.2'},
    {value:'ม.1.3',label:'ม.1.3'},
    ];

    return (
        <div className="bg-white p-15 rounded-3xl shadow-md w-full max-w-md mx-auto border border-gray-300 mt-25">
            <h2 className="text-3xl font-semibold text-center mb-2 text-gray-700">ห้อง 1303</h2>
            <p className="text-center mb-7 text-gray-600 text-lg">คาบ 1 (08.30-09.20)</p>
            
            <div className="flex justify-center mb-4 text-lg space-x-6">
                <span
                    className={`cursor-pointer px-4 pb-1 ${
                        mode==='class' ? 'border-[#466AB0] border-b-2 text-[#466AB0] font-semibold' : 'text-gray-500'
                    }`}
                    onClick={()=>setMode('class')}
                >การเรียนการสอน</span>
                <span
                    className={`cursor-pointer px-7 pb-1 ${
                        mode==='activity' ? 'border-[#466AB0] border-b-2 text-[#466AB0] font-semibold' : 'text-gray-500'
                    }`}
                    onClick={()=>setMode('activity')}
                >กิจกรรม</span>
            </div>

            {mode==='class' ? (
                <div className="space-y-4 w-[90%] mx-auto block">
                    <div>
                        <label className="block font-semibold mb-1 text-gray-700">ครูผู้สอน</label>
                        <Select
                            className="react-select-container shadow-md"
                            classNamePrefix="react-select"
                            options={teacherOptions}
                            value={teacherOptions.find(option=>option.value===teacher)}
                            onChange={selected=>setTeacher(selected?.value||'')}
                            placeholder="เลือก">
                        </Select>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-semibold mb-1 text-gray-700">รายวิชา</label>
                            <Select
                                className="shadow-md"
                                isSearchable={false}
                                options={subjectOptions}
                                value={subjectOptions.find(option=>option.value===subject)}
                                onChange={selected=>setSubject(selected?.value||'')}
                                placeholder="เลือก"
                                classNamePrefix="react-select">
                            </Select>
                        </div>
                        <div className="w-1/2">
                            <label className="block font-semibold mb-1 text-gray-700">ห้องที่สอน</label>
                            <Select
                                className="shadow-md"
                                isSearchable={false}
                                options={roomOptions}
                                value={roomOptions.find(option => option.value === studentRoom)}
                                onChange={selected => setStudentRoom(selected?.value || '')}
                                placeholder="เลือก"
                                classNamePrefix="react-select">
                            </Select>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-[90%] mx-auto block">
                    <label className="block font-semibold mb-1 text-gray-700">รายละเอียด</label>
                    <input
                    type="text"
                    className="focus:outline-none focus:border-gray-400 block w-full text-gray-600 border border-gray-300 shadow-md px-3 py-2 rounded-xl"
                    placeholder="ประเภทกิจกรรมที่จะทำ..."
                    value={activityDetail}
                    onChange={(e)=>setActivityDetail(e.target.value)}/>
                </div>
            )}

            <button
                className="mt-10 w-[90%] py-2 rounded-full hover:bg-gradient-to-r from-red-300 to-red-600 shadow-md mx-auto block hover:text-white border border-gray-300 bg-white text-gray-600 "
                onClick={handleSubmit}
            >ยืนยันการจอง</button>
        </div> 
    );
}
export default BookingForm