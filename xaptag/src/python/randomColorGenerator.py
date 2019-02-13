_file = open('colors.txt', 'r')
colors = []
for i in _file.readlines():
    if ('white' not in i) and ('light' not in i) and ('aqua' not in i) and ('gray' not in i) and ('grey' not in i):
        colors.append(str(i))

_file.close()
print(colors)
