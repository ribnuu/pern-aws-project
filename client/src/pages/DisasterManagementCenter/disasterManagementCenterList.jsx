import React from 'react'

const data = [
    {
        id : 1,
        disasterType : 'Tsunami',
        disasterTime : '10.44pm',
        disasterDescription : 'Evacuate immediately',
        disatsterLocation : 'Galle',
        risk: 'Light',
        locationToAlert : 'Southern',
        citiesToAlert : 'Galle , Matara'
    },
    {
        id : 2,
        disasterType : 'Flood',
        disasterTime : '2.44pm',
        disasterDescription : 'Restricting going out until further notice and protect you belongings.',
        disatsterLocation : 'Colombo',
        risk: 'Mild',
        locationToAlert : 'Western',
        citiesToAlert : 'Colombo , Kelaniya'
    },
    {
        id : 3,
        disasterType : 'Heat Wave',
        disasterTime : '2 days',
        disasterDescription : 'Restricting going out until further notice.',
        disatsterLocation : 'All of Sri Lanka',
        risk: 'High',
        locationToAlert : 'All of Sri Lanka',
        citiesToAlert : 'All cities of Sri Lanka'
    },
    {
        id : 4,
        disasterType : 'Heat Wave',
        disasterTime : '2 days',
        disasterDescription : 'Restricting going out until further notice.',
        disatsterLocation : 'All of Sri Lanka',
        risk: 'High',
        locationToAlert : 'All of Sri Lanka',
        citiesToAlert : 'All cities of Sri Lanka'
    },
    {
        id : 5,
        disasterType : 'Fishing',
        disasterTime : '2 days',
        disasterDescription : 'Do not go to fishing at all until further notice.',
        disatsterLocation : 'All of Sri Lanka',
        risk: 'High',
        locationToAlert : 'All of Sri Lanka',
        citiesToAlert : 'All cities of Sri Lanka'
    }
]

const disasterManagementCenterList = () => {
  return (
    <section className="mx-12 my-12">
      <h1 className="text-center text-2xl mx-auto my-auto">Current Disaster</h1>
      <div className="bg-gray-200 p-4 grid grid-cols-1 text-black text-sm w-102 rounded-lg  space-between gap-6">
        {data.map((data) => (
          <div className="bg-red-500 text-bold text-xl rounded-lg px-2">
            <div className="my-4">
              <h1>Disaster Alerts #{data.id}</h1>
              <div className="flex gap-2">
                <div>Disaster Type :</div>
                <div>{data.disasterType}</div>
              </div>
              <div className="flex gap-2">
                <div>Disaster Time :</div>
                <div>{data.disasterTime}</div>
              </div>
              <div className="flex gap-2">
                <div>Disaster Location :</div>
                <div>{data.disatsterLocation}</div>
              </div>
              <div className="flex gap-2">
                <div>Disaster Description :</div>
                <div>{data.disasterDescription}</div>
              </div>
              <div className="flex gap-2">
                <div>Risk :</div>
                <div>{data.risk}</div>
              </div>
              <div className="flex gap-2">
                <div>Location To Alert :</div>
                <div>{data.locationToAlert}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      Alert will be sent to the local people city wise , town wise , district
      wise , island wise will be announced. <br />
      Once this notice is shown , it will be notified to the right people.
      <br />
      All dams are watched for vibrations and water level 1 widget shows cruise
      real time departure arrival schedule.
      <br />
      National Critical Infratructure safety protocol - shows the temperature in
      petroleum corporation, kolonnawa petrol tanks, norachchalai power plant
      current output, detect failures as a general place all power plants
      including laxapana
      <br />
    </section>
  );
}

export default disasterManagementCenterList
