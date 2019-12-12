import argparse
import gpt_2_simple as gpt2
import os

parser = argparse.ArgumentParser()
parser.add_argument('modelType', nargs='?', default='124M', help='Type of model to use for Allison')
parser.add_argument('trainSource', nargs='?', default='allison.txt', help='Source of text for training model')
parser.add_argument('trainingSteps', nargs='?', default='1', help='Amount of steps to train model on initialization', type=int)
args = parser.parse_args()

model_name = args.modelType
file_name = args.trainSource
steps = args.trainingSteps

if not os.path.isdir("models/" + model_name):
    print("No model of this type exists. Please run initializeModel.py")
elif not os.path.isdir("checkpoint"):
    print("No checkpoints exist. Please run at least one training cycle.")
else:
    sess = gpt2.start_tf_sess()
    gpt2.load_gpt2(sess)
    single_text = gpt2.generate(sess,return_as_list=True, temperature=0.7 , length=100, prefix="Trees are")
    print(single_text)
