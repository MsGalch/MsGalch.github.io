import math

print("Введите коэффициенты для квадратного уравнения (ax^2 + bx + c = 0):")
print("Введите значение а")
a = int(input())
print("Введите значение b")
b = int(input())
print("Введите значение c")
c = int(input())

if a == 0:
    if b == 0:
        if c == 0:
            print("0==0")
        else:
            print("{}!=0".format(c))
    else:
        print('x=',-c/b)   
else:		
    D = b**2 - 4*a*c
    if D > 0:
        x1 = (-b + math.sqrt(D))/2*a
        x2 = (-b - math.sqrt(D))/2*a
        print('Существуют 2 корня:')
        print('x1=',x1)
        print('x2=',x2)
    elif D == 0:
        x1 = -b/2*a
        print('Существует единственный корень x1=',x1)
    else:
        x1 = complex(-b + math.sqrt(abs(D)))/2*a
        x2 = complex(-b - math.sqrt(abs(D)))/2*a
        print('x1=',x1)
        print('x2=',x2)
    input()

