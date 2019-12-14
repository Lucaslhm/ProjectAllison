import argparse
import gpt_2_simple as gpt2
import os
import requests

parser = argparse.ArgumentParser()
parser.add_argument('modelType', nargs='?', default='124M', help='Type of model to use for Allison')
parser.add_argument('trainSource', nargs='?', default='allison.txt', help='Source of text for training model')
parser.add_argument('trainingSteps', nargs='?', default='1', help='Amount of steps to train model on initialization',type=int)
args = parser.parse_args()

model_name = args.modelType
if model_name == '124M':
    if not os.path.isdir(os.path.join("models", model_name)):
        print("Downloading the 124M Model")
        gpt2.download_gpt2(model_name=model_name)  # model is saved into current directory under /models/124M/
    else:
        print("124M Model loaded")
elif model_name == '355M':
    if not os.path.isdir(os.path.join("models", model_name)):
        print("Downloading the 355M Model")
        gpt2.download_gpt2(model_name=model_name)  # model is saved into current directory under /models/355M/
    else:
        print("355M Model loaded")
else:
    print("Unsupported model")
    print("Currently we support 124M or 355M")

file_name = args.trainSource
if not os.path.isfile(file_name):
    response = input("No training data found. Would you like to download a sample? (Y/N)")
    if response.upper() == "Y" or response.upper() == "YES":
        url = "https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt"
        data = requests.get(url)
        with open(file_name, 'w') as f:
            f.write(data.text)
    else:
        print("Please create a training source then try again")
        exit()
else:
    print("Training source loaded")

if args.trainingSteps > 0:
    print("Training the model for " + str(args.trainingSteps) + " Steps")
    sess = gpt2.start_tf_sess()
    gpt2.finetune(sess, file_name, model_name=model_name, steps=args.trainingSteps)
    single_text = gpt2.generate(sess)
    print(single_text)
else:
    print('WARNING: Model cannot generate content until at least one training cycle is completed. Run the finetune method to train the model.')