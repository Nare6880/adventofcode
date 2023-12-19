#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <string.h>

using namespace std;

int main(){
    ifstream myfile("test.txt");
    vector<vector<string>> lines;
    string lower_bound, upperbound, lettter;
    while (myfile >> lower_bound >> upperbound >> lettter ){
        vector<string> line = {lower_bound, upperbound, lettter};
        cout << lower_bound << " " << upperbound << " " << lettter<< endl;
        if (upperbound ==  "map:") {
            lines.push_back({lower_bound+upperbound});
        }
        else{
            lines.push_back(line);
        }
        
    }
    for (int i = 0 ; i < lines.size(); i++){
        cout << lines[i][0] << " " << lines[i][1] << " " << lines[i][2] << endl;
    }
}