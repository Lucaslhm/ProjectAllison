import argparse
import gpt_2_simple as gpt2
import os


def dummy():
    out = '';
    parser = argparse.ArgumentParser()
    parser.add_argument('modelType', nargs='?', default='124M', help='Type of model to use for Allison')
    parser.add_argument('modelDir', nargs='?', default='./models', help='Specifies the directory of models.')
    parser.add_argument('checkpointDir', nargs='?', default='./checkpoint', help='Specifies directory to look for checkpoints')
    args = parser.parse_args()

    model_name = args.modelType
    model_dir = args.modelDir
    checkpoint_dir = args.checkpointDir

    if not os.path.isdir(model_dir + '/' + model_name):
        print("No model of this type exists. Please run initializeModel.py")
        return out
    elif not os.path.isdir(checkpoint_dir):
        print("No checkpoints exist. Please run at least one training cycle.")
        return out
    else:
        sess = gpt2.start_tf_sess()
        gpt2.load_gpt2(sess)
        out = gpt2.generate(sess, return_as_list=True, temperature=0.7, length=100, prefix="Trees are", checkpoint_dir=checkpoint_dir, model_dir=model_dir)
        print(out)
        return out


if __name__ == '__main__':
    dummy = dummy()
