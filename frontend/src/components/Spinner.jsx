import React from 'react'
import Cliploader from 'react-spinners/Cliploader'

function Spinner({ loading }) {

    const override = {
        display: 'block'
    }
    return (
        <Cliploader
            color='#8470ff'
            loading={loading}
            cssOverride={override}
            size={100}
        />
    )
}

export default Spinner