const form = document.getElementById('uploadForm');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log(form)
    uploadFile(form)
});

const uploadFile = async (data) => {
    const formData = new FormData(data)
    const options = {
        method: 'POST',
        body: formData
    }
    
    const resp = await fetch('https://httpbin.org/post', options)
    
    try {
        const data = await resp.json()
        console.log(data.files)
    } catch(e) {
        console.log('error:',e)
    }
   
}
