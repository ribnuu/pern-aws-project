import React from 'react'

const WhoElseSearch = () => {
    return (
        <section className='mx-12 my-1 px-102'>
            <div className=' grid grid-cols-1  gap-4 text-sm font-black py-12'>
                <div className='bg-white px-4 py-2 rounded-lg text-center'>
                    <h1 className='text-gray-900 font-bold mx-auto text-xl uppercase'>WES - Who else search</h1>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4 flex flex-col'>
                    <div>
                        Dehiwala Police
                    </div>
                    <div>
                        2022 - 12 - 02

                    </div>
                    <div>
                        01.00pm
                    </div>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4' >
                    <div>
                        Wellawatte Police
                    </div>
                    <div>
                        2023-01-12
                    </div>
                    <div>
                        04.00pm
                    </div>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4' >
                    <div>
                        Wellawatte Police
                    </div>
                    <div>
                        2023-01-12
                    </div>
                    <div>
                        04.00pm
                    </div>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4' >
                    <div>
                        Nugegoda Police
                    </div>
                    <div>
                        2023-01-12
                    </div>
                    <div>
                        04.00pm
                    </div>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4' >
                    <div>
                        Dam Street Police
                    </div>
                    <div>
                        2023-01-12
                    </div>
                    <div>
                        04.00pm
                    </div>
                </div>
                <div className='bg-white text-gray-950 rounded-lg px-8 py-4' >
                    <div>
                        Pettah Police
                    </div>
                    <div>
                        2023-01-12
                    </div>
                    <div>
                        04.00pm
                    </div>
                </div>
            </div>
            <div>
                When a person is looked by dam street police station the ccc screen will load a list of other entities or police stations who are also looking for this particular person.<br /><br />

                There we can include whenever a blacklisted passport is scanned, or searched, that details are also saved, who searched a blacklisted person
            </div>
        </section>
    )
}

export default WhoElseSearch
