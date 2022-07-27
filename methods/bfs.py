from collections import deque

def bfs(x,y,array):
    r = len(array)
    c = len(array[0])
    g = [[None for i in range(c)] for j in range(r)]
    q = deque([(x,y)])
    g[x][y] = 1
    while q:
        u,v = q.popleft()
        for i,j in [(0,1), (0,-1), (1,0), (-1,0)]:
            a,b = u+i, v+j
            if 0 <= a < r and 0 <= b < c and g[a][b] is None:
                g[a][b] = g[u][v] + 1
                if map[a][b] != 1:
                    q.append((a,b))
    return g

map = [[0,0,0,0,0,0], [1,1,1,1,1,0], [0,0,0,0,0,0], [0,1,1,1,1,1], [0,1,1,1,1,1], [0,0,0,0,0,0]]
print(bfs(5,5,map))