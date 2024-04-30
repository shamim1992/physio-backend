import Service from "../models/servicesModels.js";


// export const handleFileUpload = (req, res) => {
//     const { filename } = req.file;

//     const { serviceName, price, description } = req.body
//     const newFile = new Service({
//         serviceimage: filename,
//         serviceName,
//         price,
//         description
//     });

//     newFile.save()
//         .then(savedFile => {
//             res.status(200).json({ message: 'File uploaded successfully', file: savedFile });
//         })
//         .catch(error => {
//             res.status(500).json({ error: 'Error saving file to database' });
//         });
// };


export const addService = async (req, res) => {
    const { servicename, price, description } = req.body
   const {filename} = req.file;
    console.log(req.body);
    console.log(filename);
    try {

        const newService = new Service({
            servicename,
            price,
            description,
            serviceimage: filename
        });

        const savedService = await newService.save()
        res.status(200).json("Data Saved Successfully");
    } catch (error) {
        res.status(500).json({ error: 'Error saving file to database' });
    }
}

export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving services' });
    }
}

export const updateServices = async (req, res) => {
    const { id } = req.params;
    const { serviceName, price, description } = req.body
    const { filename } = req.file;
    try {
        const updatedService = await Service.findByIdAndUpdate(id, {
            serviceName,
            price,
            description,
            serviceimage: filename
        }, { new: true });
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({ error: 'Error updating services' });
    }
}

export const singleService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json("Unable to find service");
    }

}

export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        res.status(200).json(deletedService);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting services' });
    }
}


