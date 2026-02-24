import React, {useState} from 'react';

const sampleData= [
    {id:"IMEI-4534",version:"v2.1",os:"Android 16",region:"Bangalore",lastSeen:"5 hours ago",status:"Up-to-date"},
    {id:"IMEI-2245",version:"v1.9",os:"Android 15",region:"Gurgaon",lastSeen:"2 days ago",status:"Inactive"},
    {id:"IMEI-1114",version:"v2.4",os:"Android 15",region:"Delhi",lastSeen:"5 days ago",status:"Outdated"},
    {id:"IMEI-9891",version:"v2.5",os:"Android 14",region:"Bangalore",lastSeen:"8 days ago",status:"Failed"},
    {id:"IMEI-6456",version:"v2.2",os:"Android 16",region:"Bangalore",lastSeen:"12 days agp",status:"Up-to-date"},
];

function MDMDashboard(){
    const [devices, setDevices]=useState(sampleData);
    const [searchVal, setSearchVal]=useState("");

    const totalDevices=devices.length;
    const upToDate=devices.filter(d => d.status=="Up-to-date").length;
    const inactive=devices.filter(d => d.status=="Inactive").length;
    const failed=devices.filter(d => d.status=="Failed").length;

    const filteredList=devices.filter(
        d => d.id.toLowerCase().includes(searchVal.toLowerCase()) ||
        d.region.toLowerCase().includes(searchVal.toLowerCase())
    )

    const getStatusColor=(status) => {
        switch(status){
            case "Up-to-date": return "bg-green-100 text-green-800";
            case "Outdated": return "bg-yellow-100 text-yellow-800";
            case "Failed": return "bg-red-100 text-red-800";
            case "Inactive": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    return(
        <div className="min-h-screen bg-gray-50 p-8 font-sans">
            <h1 className="text-3xl font-bold font-verdana text-gray-800 mb-8">Mobile Device Management <div className="text-gray-400">Dashboard</div></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm bold font-medium text-gray-500">Total Devices</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{totalDevices}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm bold font-medium text-gray-500">Up-to-date</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">{upToDate}</p>
                    <div className="text-sm text-gray-400 font-bold">{Math.round((upToDate/totalDevices)*100)}%</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm bold font-medium text-gray-500">Inactive</h3>
                    <p className="text-3xl font-bold text-gray-600 mt-2">{inactive}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-sm bold font-medium text-gray-500">Failed</h3>
                    <p className="text-3xl font-bold text-red-600 mt-2">{failed}</p>
                </div>
            </div>

            {/* inventory table*/} 

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-600">Device Inventory</h3>
                    <input type="text" placeholder="Search by ID or Region" value={searchVal} 
                    onChange={(e) => setSearchVal(e.target.value)}
                        className="p-2 ml-4 border rounded-md text-sm focus:ring-2 focus:ring-green-600 outline-none"
                    />
                </div>
    
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg gray-50 text-gray-500 text-sm border-b">
                            <th className="p-4 font-medium">Device ID</th>
                            <th className="p-4 font-medium">App Version</th>
                            <th className="p-4 font-medium">OS</th>
                            <th className="p-4 font-medium">Region</th>
                            <th className="p-4 font-medium">Last Seen</th>
                            <th className="p-4 px-8 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((device,index) =>(
                            <tr key={index} className="border-b hover:bg-gray-50 cusor-pointer">
                                <td className="p-4 text-sm text-green-600 font-bold">{device.id}</td>
                                <td className="p-4 text-sm text-gray-700">{device.version}</td>
                                <td className="p-4 text-sm text-gray-700">{device.os}</td>
                                <td className="p-4 text-sm text-gray-700">{device.region}</td>
                                <td className="p-4 text-sm text-gray-700">{device.lastSeen}</td>
                                <td className="p-4 text-sm">
                                    <div className={`px-1 py-1 rounded-full w-28 text-center text-s ${getStatusColor(device.status)}`}>{device.status}</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredList.length === 0 && (
                    <div className="p-4 text-center text-gray-500">No Matching Devices found</div>
                )}
            </div>
            </div>
        </div>
    );
}

export default MDMDashboard;