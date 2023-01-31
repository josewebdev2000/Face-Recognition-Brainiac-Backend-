export const handleAPIRequest = (req, res, APIENV, fetchFunc, webRequest) =>
{
    const {imageUrl} = req.body;

    webRequest(APIENV ,imageUrl, fetchFunc, (data) => {

        const relevantData = data.outputs[0].data.regions;

        if (relevantData !== undefined)
        {
            res.json(relevantData);
        }

        else
        {
            res.json("No Face Detected");
        }
    }, 
    console.log, 
    console.log); 

}

export const handleImage = (req, res, db) => {

    const { id } =  req.body;
    db('users').where('id', '=', id).increment('entries',1).returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}