import random 

def foo(x, y, z):
    return 6*x**3 + 9*y**2 + 90*z - 25

def fitness(x: int, y: int, z: int):
    ans = foo(x, y, z)

    if ans == 0:
        return 99999
    else:
        return abs(1/ans)
    
solutions = []
for s in range(1000):
    solutions.append((
        random.uniform(0, 10000),
        random.uniform(0, 10000),
        random.uniform(0, 10000)
    ))

# print(solutions)

for i in range(10000):
    ranked_solutions = []
    for s in solutions:
        ranked_solutions.append((
            fitness(s[0], s[1], s[2]),
            s
        ))
    ranked_solutions.sort()
    ranked_solutions.reverse()

    print(f"=== Gen {i} best solution === ")
    print(ranked_solutions[0])

    if ranked_solutions[0][0] > 9999:
        break

    best_solutions = ranked_solutions[:100]

    elements = []
    for s in best_solutions:
        elements.append(s[1][0])
        elements.append(s[1][1])
        elements.append(s[1][2])

    newGen = []
    for _ in range(1000):
        e1 = random.choice(elements) * random.uniform(0.99, 1.01)
        e2 = random.choice(elements) * random.uniform(0.99, 1.01)
        e3 = random.choice(elements) * random.uniform(0.99, 1.01)

        newGen.append((e1, e2, e3))

    solutions = newGen