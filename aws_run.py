import boto3

def detect_labels_local_file(photo):


    client=boto3.client('rekognition')

    with open(photo, 'rb') as image:
        response = client.detect_faces(Image={'Bytes': image.read()},Attributes=['ALL'])
        print('Detected labels in ' + photo)
        print(response)

    with open(photo, 'rb') as image:
        response = client.recognize_celebrities(Image={'Bytes': image.read()})
	print(response)
def main():
    photo='profile.jpeg'

    detect_labels_local_file(photo)
   # print("Labels detected: " + str(label_count))


if __name__ == "__main__":
    main()
