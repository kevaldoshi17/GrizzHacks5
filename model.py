from clarifai.rest import ClarifaiApp

app = ClarifaiApp(api_key='0ae4f38ea378451599e860e7e7cb2868')
model = app.public_models.demographics_model
response = model.predict_by_url('profile.jpeg')

print(response)
