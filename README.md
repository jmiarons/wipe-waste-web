# Wipe Waste Web

## Inspiration
Climate change is a threat right now. We want to live in a healthier and sustainable environment. We thought that we can contribute to that by providing a helpful tool to recycle better and easier.

## What it does
You have something to throw away. You use WWW to scan it, and it tells in which container you have to throw it. Afterwards, you provide your city card via NFC or by typing your ID. After identifying yourself, you scan the QR located in the container and if it matches the scanned waste, and you are allowed to throw in the container, it will unlock.

## How we built it
First of all, we needed a backend and a frontend for the user interface. We decided to go with Python and Django for the backend technology. We used Django because it is the only Python that offers a DOM in order to connect a database. Then we needed to classify our client trash photos into what they are. For that, we took a pre-trained model and added a new category to identify which type of trash you are recycling. Latter, we integrate it to a FastAPI server so every community/city will be able to connect to. And finally connect it to the Django server. After we get our images classified, we used HTML and JS to scan a NFC card and scan the QR code from the container.


## Scalability
We have developed a solution that consists of different layers and can be adapted to every city in the world. We have a distributed model that classifies the images and a backend that, with the given classification and the recycling rules for that city, tells the user in which container they should throw it. 
Also, we have a collaborative system that if the model tells a wrong container you can correct it and the backend will store all the bad prediction and will retrain the model with them. Using this method, we only train the model when there is a specific amount of bad predictions. Doing this collaborative training, we aim to decrease the energy and compute time spent in the servers training the model.  
Using this architecture, we can deploy this solution to any city in the world. 

In the next picture, you can find a representation of the proposed infrastructure.
![Infrastructure](https://github.com/jmiarons/wipe-waste-web/blob/main/assets/diagram-www.png?raw=true)

## Challenges we ran into
Find a model that suits our needs, and we don't have to spend a lot of time training it. 
We wanted to do something different, and we added a NFC reader in our front-end. It was a tricky part because it is a new feature, and it is not supported in every browser.
We had issues trying to deploy disco locally and add our model to it.

## Accomplishments that we're proud of
We went from zero to almost hero in tensorflow.js, ML models and training them on a browser. Also, the model is capable to identify almost any type of trash and classify it correctly. Furthermore, we can read some NFC cards to identify the user. And lastly, but not less important, we can do a full demo of the application.

## What we learned
Django was a black box for two of us, know we can proudly say we know a bit about Django to do a simple backend. Also, the frontend was an undiscovered path for the one in charge of it and even though we used plain HTML and CSS with Bootstrap we have a functional and kind of pretty user interface. Lastly but not less significant, none of us had prior knowledge about Machine Learning and Computer Vision, so it was a challenge for the one in charge of finding, training and connecting the model to the backend. We could say that we leave our comfort zone to develop this project in almost 24 hours. 

## What's next for Wipe Waste Web
- Improve the accuracy of the model
- Do a better login system to identify users
- Have a dedicated front-end using preferably React
- Substitute QR with a more sophisticated way to identify the container
