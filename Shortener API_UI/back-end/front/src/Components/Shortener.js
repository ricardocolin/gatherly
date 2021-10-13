import React, { useState } from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
// import UrlGet from '../../../models/Url';

const Shortener = () => {
    const [longUrl, setLink] = useState('')
    const [short, setShort] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
            getLink();
            setLink('');
            setIsLoading(!isLoading);

            const request = new Request("http://localhost:5000/api/short", {
                method: "post",
                body: JSON.stringify({longUrl}),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            });
            
            // Send the request with fetch()
            fetch(request)
                .then(res => {
                    console.log({longUrl});
                    if (res.status === 200) {
                        return res.json()
                    }
                })
    };
    const getLink = async () => {
        // try {
        //     const urlGet = await UrlGet.findOne({ urlCode: req.params.code });
            
        //     if(urlGet){
        //         setShort(urlGet.longUrl);
        //         setIsLoading(false)
        //         // return res.redirect(url.longUrl);
        //     } else {
        //         return res.status(404).json('No url found');
        //     }
        // } catch (err) {
        //     console.error(err);
        //     res.status(500).json('Server error');
        // }
    }


    return (
        <div>
            <h1>URL SHORTENER - Gatherly</h1>
            <form onSubmit={(e) => handleSubmit(e)} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField style={{ marginBottom: '20px' }} label="Input Your Link" variant="outlined" value={longUrl} 
                onChange={(e) => setLink(e.target.value)}
                />
                {!isLoading && (
                <Button style={{ marginBottom: '20px' }} onClick={(e) => handleSubmit(e)}variant="contained" color="secondary">Submit</Button>
                )}

                {isLoading && <LinearProgress />}
            </form>
            {short && <div>Short Link: {short}</div>}
        </div>
    )
}

export default Shortener;
