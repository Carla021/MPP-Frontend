import { useContext, useRef } from "react";
import { MonitorsContext } from "../../contexts/MonitorsContext";
import { Monitor } from "../../models/entity";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/button/Button";

import './AddMonitorPage.css'
import axios from "axios";

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    brandInput: React.RefObject<HTMLInputElement>,
    refreshRateInput: React.RefObject<HTMLInputElement>,
    urlInput: React.RefObject<HTMLInputElement>,
): Monitor {
    if (!idInput.current || !brandInput.current || !refreshRateInput.current || !urlInput.current)
        throw new Error('Inputs references are null');

    const monitorId: number = parseInt(idInput.current.value);
    const monitorBrandInput:string = brandInput.current.value;
    const monitorRefreshRateInput:string = refreshRateInput.current.value;
    const monitorUrlInput: string = urlInput.current.value;

    return new Monitor(monitorId, monitorBrandInput, monitorRefreshRateInput, monitorUrlInput);
}

const AddMonitorPage = () => {
    document.title = 'Add a monitor';

    const idInput = useRef<HTMLInputElement>(null);
    const brandInput = useRef<HTMLInputElement>(null);
    const refreshRateInput = useRef<HTMLInputElement>(null);
    const urlInput = useRef<HTMLInputElement>(null);

    const monitorsContext = useContext(MonitorsContext);
    const navigate = useNavigate();

    const handleClickOnWrapper = () => {
        try {
            const inputMonitor = handleOnClick(idInput, brandInput, refreshRateInput, urlInput);
            
            axios.post('http://localhost:5000/api/addMonitor', inputMonitor)
                .then(response => {
                    monitorsContext?.addMonitor(response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error adding monitor:', error);
                }); 
            // monitorsContext?.addMonitor(inputMonitor);
            // navigate('/');
        } catch (error) {
            alert(error);
        }
    };
    
    return (
        <Layout>
            <div className='add-page-container'>
                <div className='add-title'>Add monitor</div>

                <form>
                    <input type="text" placeholder="ID" ref={idInput} />
                    <input type="text" placeholder="Brand" ref={brandInput} />
                    <input type="text" placeholder="RefreshRate" ref={refreshRateInput} />
                    <input type="text" placeholder="url" ref={urlInput} />
                </form>

                <Button type="submit" buttonMessage="Add monitor" className="form-button" onClick={handleClickOnWrapper} />
            </div>
        </Layout>
    ) 
}

export default AddMonitorPage;