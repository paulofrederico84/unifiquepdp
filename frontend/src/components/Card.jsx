import React from 'react'

export default function Card({ title, value, children }) {
    return (
        <div className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">{title}</div>
                <div className="text-2xl font-semibold text-blue-700">{value}</div>
            </div>
            {children}
        </div>
    )
}
