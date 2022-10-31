import 'dart:io';

void main() {
  int files = 0;
  Directory dir = Directory("../anzaweb");
  dir.list(recursive: true).forEach((element) {
    if (element.toString().startsWith("File: ../anzaweb/node_modules/")) {
    } else {
      print(element.toString());
      files++;
    }
  });

  print(files);
}
