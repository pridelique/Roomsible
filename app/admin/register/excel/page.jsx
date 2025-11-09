'use client';
import { SessionContext } from '@provider/SessionProvider';
import React, { useState, useContext, useEffect } from 'react'
import * as XLSX from "xlsx"

function ExcelRegister() {
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState([])
    const { getUser } = useContext(SessionContext);


    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result)
            const workbook = XLSX.read(data, { type: "array" })

            const sheetName = workbook.SheetNames[0]
            const sheet = workbook.Sheets[sheetName]
            const json = XLSX.utils.sheet_to_json(sheet)
            json.forEach((user) => {
                for (const key in user) {
                    user[key] = String(user[key])
                }
            })
            setUsers(json)
            // console.log(json)
        }
        reader.readAsArrayBuffer(file)
    }

    const handleSubmit = async (e) => {
        for (const user of users) {
            const { firstname, lastname, classroom, no, role, student_id } = user
            const email = `${student_id}@satriwit.ac.th`
            const password = `${student_id}_${classroom}`
            console.log(`${email} ${password}`)
            console.log(firstname)
            if (!email || !password || !firstname || !lastname || !classroom || !no) {
                setErrors(prevErrors => [...prevErrors, { email, message: "กรอกข้อมูลให้ครบถ้วน" }]);
                continue;
            }
            if (password.length < 6) {
                setErrors(prevErrors => [...prevErrors, { email, message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }]);
                continue;
            }
            try {
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ firstname, lastname, classroom, no, role: role || 'student', email, password}),
                })
                const data = await res.json();
                if (!res.ok) {
                    // console.log(data);
                    if (data.message === "Invalid input") {
                        setErrors(prevErrors => [...prevErrors, { email, message: "กรุณากรอกข้อมูลให้ถูกต้อง" }]);
                    } else if (data.message === "A user with this email address has already been registered") {
                        setErrors(prevErrors => [...prevErrors, { email, message: "อีเมลนี้ถูกใช้งานแล้ว" }]);
                    } else {
                        setErrors(prevErrors => [...prevErrors, { email, message: data.error || "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง" }]);
                    }
                } else {
                    
                }
            } catch (error) {
                console.error(error);
                setErrors(prevErrors => [...prevErrors, { email, message: "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง" }]);
            }
        }
        // console.log(errors)
    }

    useEffect(() => {
        console.log(errors);
        
    }, [errors])

    return (
        <div style={{ padding: "20px" }}>
            <h1>Upload Excel and Register Users</h1>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} />

            {users.length > 0 && (
                <>
                    <h3>Preview:</h3>
                    <pre>{JSON.stringify(users, null, 2)}</pre>
                    <button onClick={handleSubmit}>Register All Users</button>
                </>
            )}
        </div>
    )
}

export default ExcelRegister