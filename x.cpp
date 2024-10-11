#include <iostream>
using namespace std;

int main() {
	int w;
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            w = i;
            break;
        }
    }
    cout << "i: " << w << endl;
    // 'i' is not accessible here because it is declared within the loop scope.
    return 0;
}

