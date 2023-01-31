function webRequest(APIENV, url, fetchFunc, thenSuccess, catchErr)
{
    const {USER_ID, PAT, APP_ID, MODEL_ID, MODEL_VERSION_ID} = APIENV;
    
    const IMAGE_URL = url;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    fetchFunc("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(result => {

            thenSuccess(result);
            
        })
        .catch(error => {
            catchErr('Failed HTTP Request');
        });
}

export default webRequest;