import React from 'react'
import ModifyComponent from '../../components/products/ModifyComponent';
import { useParams } from 'react-router-dom';

function ModifyPage() {
    const { seq } = useParams();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                <ModifyComponent seq={seq}></ModifyComponent>
            </div>
        </div>
    );

}

export default ModifyPage