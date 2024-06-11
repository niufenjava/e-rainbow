import os
import glob
import re


def extract_annotations(file_path):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    category = None
    name = None
    example = None
    results = []

    for line in lines:
        line = line.strip()
        if "@category" in line:
            if category and name and example:
                results.append(f"{name} {example}")
                # results.append("{}".format(name))
            category = line
            name = None
            example = None
        elif "@name" in line:
            name = line.split("@name")[1].strip()  # Keep only the part after @name
        elif "@example" in line:
            example = line.split("@example")[1].strip()  # Keep only the part after @example

    # Don't forget the last one
    if category and name and example:
        # results.append(f"{name} {example}")
        results.append("{}".format(name))

    return results


js_files = glob.glob('./*.js')

for js_file in js_files:
    annotations = extract_annotations(js_file)
    for annotation in annotations:
        print(annotation)
