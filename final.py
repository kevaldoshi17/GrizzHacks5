import os 
import numpy
import time
import pandas
import boto3
import requests
from clarifai.rest import ClarifaiApp
import shutil


Names = list()
client=boto3.client('rekognition')

app = ClarifaiApp(api_key='0ae4f38ea378451599e860e7e7cb2868')
model = app.public_models.demographics_model
model2 = app.public_models.apparel_model

# headers = {
# 		'accept': 'application/json',
# 		'Content-Type': 'application/json',
# 	}

while True:
	file2 = os.listdir("upload/")

	if len(file2) > 0:
		file = os.listdir("upload/")[0]
		photo = "upload/" + file

		# data = '{ "api_key": "d45fd466-51e2-4701-8da8-04351c872236", "file_uri": "", "detection_flags": "basicpoints,propoints,classifiers,content", "recognize_targets": [ "all@mynamespace" ], "original_filename": "upload/5f673da02ad34.png"}'#.format(photo)
		# response_beta = requests.post('https://www.betafaceapi.com/api/v2/media', headers=headers, data=data)
		
		response_clar_appar = model2.predict_by_filename(photo)




		with open(photo, 'rb') as image:
			response_aws_fac = client.detect_faces(Image={'Bytes': image.read()},Attributes=['ALL'])
			

		with open(photo, 'rb') as image:
			response_celeb_fac = client.recognize_celebrities(Image={'Bytes': image.read()})





		# print(response_clar_demo,response_clar_appar,response_aws_fac,response_celeb_fac)
		clothes_list = list()
		clothes = (response_clar_appar["outputs"][0]["data"]["concepts"])

		for clo in clothes[0:5]:
			if clo['value'] > 0.88:
				clothes_list.append(clo['name'])


		celeb_count = len(response_celeb_fac["CelebrityFaces"])
		
		face_char = response_aws_fac["FaceDetails"][0]

		smile = face_char['Smile']['Value']
		smile_c = face_char['Smile']['Confidence']

		eyeglasses = face_char['Eyeglasses']['Value']
		eyeglasses_c = face_char['Eyeglasses']['Confidence']

		beard = face_char['Beard']['Value']
		beard_c = face_char['Beard']['Confidence']

		emotions = face_char['Emotions'][0]['Type']
		emotions_c = face_char['Emotions'][0]['Confidence']

		print(emotions,emotions_c)
		# shutil.move("upload/"+file, "./upload 2/"+file)



	