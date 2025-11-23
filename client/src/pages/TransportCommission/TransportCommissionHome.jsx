import React from 'react'
import { Link } from 'react-router-dom'

const TransportCommissionHome = () => {
    return (
        <section className="">
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-3 xl:grid-cols-5 text-sm gap-2  font-black mt-12">
                <div className="bg-white border border-gray-900 rounded-md px-4 py-2"
                >
                    <Link to='/ntc/create' className="">
                        Create Permit
                    </Link>
                </div>
                <div className="bg-white border border-gray-900 rounded-md px-4 py-2"
                >
                    <Link to='/ntc/view' className="">
                        View Permit
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TransportCommissionHome
