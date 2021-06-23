# 图

前面讲的数据结构都可以看成是图的特例。 前面提到了二叉树完全可以实现其他树结构，其实有向图也完全可以实现无向图和混合图，因此有向图的研究一直是重点考察对象。

图论〔Graph Theory〕是数学的一个分支。它以图为研究对象。图论中的图是由若干给定的点及连接两点的线所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系，用点代表事物，用连接两点的线表示相应两个事物间具有这种关系。

## 基本概念

- 无向图 & 有向图
- 有权图 & 无权图
- 入度 & 出度
- 路径 & 环
- 连通图 & 强连通图

在无向图中，若任意两个顶点 i 与 j 都有路径相通，则称该无向图为连通图。

在有向图中，若任意两个顶点 i 与 j 都有路径相通，则称该有向图为强连通图。

- 生成树

一个连通图的生成树是指一个连通子图，它含有图中全部 n 个顶点，但只有足以构成一棵树的 n-1 条边。一颗有 n 个顶点的生成树有且仅有 n-1 条边，如果生成树中再添加一条边，则必定成环。在连通网的所有生成树中，所有边的**代价和最小**的生成树，称为最小生成树，其中**代价和**指的是所有边的权重和。

## 图的建立

一般图的题目都不会给你一个现成的图结构。当你知道这是一个图的题目的时候，解题的第一步通常就是建图。这里我简单介绍两种常见的建图方式。

### 邻接矩阵（常见）

使用一个 n \* n 的矩阵来描述图 graph，其就是一个二维的矩阵，其中 graph[i][j] 描述边的关系。

一般而言，我都用 graph[i][j] = 1 来表示 顶点 i 和顶点 j 之间有一条边，并且边的指向是从 i 到 j。用 graph[i][j] = 0 来表示 顶点 i 和顶点 j 之间不存在一条边。 对于有权图来说，我们可以存储其他数字，表示的是权重。

这种存储方式的空间复杂度为 O(n ^ 2)，其中 n 为顶点个数。如果是稀疏图（图的边的数目远小于顶点的数目），那么会很浪费空间。并且如果图是无向图，始终至少会有 50 % 的空间浪费。下面的图也直观地反应了这一点。

邻接矩阵的优点主要有：

1. 直观，简单。

2. 判断两个顶点是否连接，获取入度和出度以及更新度数，时间复杂度都是 O(1)

由于使用起来比较简单， 因此我的所有的需要建图的题目基本都用这种方式。

比如力扣 743. 网络延迟时间。 题目描述：

```
有 N 个网络节点，标记为 1 到 N。

给定一个列表 times，表示信号经过有向边的传递时间。 times[i] = (u, v, w)，其中 u 是源节点，v 是目标节点， w 是一个信号从源节点传递到目标节点的时间。

现在，我们从某个节点 K 发出一个信号。需要多久才能使所有节点都收到信号？如果不能使所有节点收到信号，返回 -1。


示例：

输入：times = [[2,1,1],[2,3,1],[3,4,1]], N = 4, K = 2
输出：2
 

注意:

N 的范围在 [1, 100] 之间。
K 的范围在 [1, N] 之间。
times 的长度在 [1, 6000] 之间。
所有的边 times[i] = (u, v, w) 都有 1 <= u, v <= N 且 0 <= w <= 100。

```

这是一个典型的图的题目，对于这道题，我们如何用邻接矩阵建图呢？

一个典型的建图代码：

```py
    graph = collections.defaultdict(list)
    for fr, to, w in times:
        graph[fr - 1].append((to - 1, w))
```

这就构造了一个临界矩阵，之后我们基于这个邻接矩阵遍历图即可。

### 邻接表

对于每个点，存储着一个链表，用来指向所有与该点直接相连的点。对于有权图来说，链表中元素值对应着权重。

例如在无向无权图中：

![graph-1](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluh8tbb5j30k00akq48.jpg)
（图片来自 https://zhuanlan.zhihu.com/p/25498681）

可以看出在无向图中，邻接矩阵关于对角线对称，而邻接链表总有两条对称的边。

而在有向无权图中：

![graph-2](https://tva1.sinaimg.cn/large/007S8ZIlly1ghluhb46urj30k00aq0ux.jpg)

（图片来自 https://zhuanlan.zhihu.com/p/25498681）

## 图的遍历

图建立好了，接下来就是要遍历。不管你是什么算法，肯定都要遍历的，一般有以下两种方法（其他奇葩的遍历方式实际意义不大，没有必要学习）。不管是哪一种遍历， 如果图有环，就一定要记录节点的访问情况，防止死循环。当然你可能不需要真正地使用一个集合记录节点的访问情况，比如使用一个数据范围外的数据原地标记，这样的空间复杂度会是 $O(1)$。

这里以有向图为例， 有向图也是类似，这里不再赘述。

### 深度优先遍历：(Depth First Search, DFS)

深度优先遍历图的方法是，从图中某顶点 v 出发， 不断访问邻居， 邻居的邻居直到访问完毕。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy6kp2117j30b507mq31.jpg)

如上图， 如果我们使用 DFS，并且从 A 节点开始的话， **一个可能的**的访问顺序是： **A -> C -> B -> D -> F -> G -> E**，当然也可能是 **A -> D -> C -> B -> F -> G -> E** 等，具体取决于你的代码，但他们都是深度优先的。

### 广度优先搜索：(Breadth First Search, BFS)

广度优先搜索，可以被形象地描述为 "浅尝辄止"，它也需要一个队列以保持遍历过的顶点顺序，以便按出队的顺序再去访问这些顶点的邻接顶点。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy7ds6u2lj30ea0a4dhf.jpg)

如上图， 如果我们使用 BFS，并且从 A 节点开始的话， **一个可能的**的访问顺序是： **A -> B -> C -> F -> E -> G -> D**，当然也可能是 **A -> B -> F -> E -> C -> G -> D** 等，具体取决于你的代码，但他们都是广度优先的。

需要注意的是 DFS 和 BFS 只是一种算法思想，不是一种具体的算法。 因此其有着很强的适应性，而不是局限于特点的数据结构的，本文讲的图可以用，前面讲的树也可以用。实际上， 只要是**非线性的数据结构都可以用**。

## 常见算法

图的题目的算法比较适合套模板。题目类型主要有：

- dijkstra
- floyd_warshall
- 最小生成树（Kruskal & Prim）
- A 星寻路算法
- 二分图（染色法）
- 拓扑排序

下面列举常见算法的模板，以下所有的模板都是基于邻接矩阵。

### 最短距离，最短路径

#### dijkstra 算法

DIJKSTRA 算法主要解决的是图中任意一点的图中某一个点的最短距离。

算法的基本思想是贪心，每次都遍历所有邻居，并从中找到距离最小的，本质上是一种广度优先遍历。这里我们借助堆这种数据结构，使得可以在 $logN$ 的时间内找到 cost 最小的点。

代码模板：

```py
import heapq


def dijkstra(graph, start, end):
    # 堆里的数据都是 (cost, i) 的二元祖，其含义是“从 start 走到 i 的距离是 cost”。
    heap = [(0, start)]
    visited = set()
    while heap:
        (cost, u) = heapq.heappop(heap)
        if u in visited:
            continue
        visited.add(u)
        if u == end:
            return cost
        for v, c in graph[u]:
            if v in visited:
                continue
            next = cost + c
            heapq.heappush(heap, (next, v))
    return -1
```

比如一个图是这样的：

```
E -- 1 --> B -- 1 --> C -- 1 --> D -- 1 --> F
 \                                         /\
  \                                        ||
    -------- 2 ---------> G ------- 1 ------
```

我们使用邻接矩阵来构造：

```py
G = {
    "B": [["C", 1]],
    "C": [["D", 1]],
    "D": [["F", 1]],
    "E": [["B", 1], ["G", 2]],
    "F": [],
    "G": [["F", 1]],
}

shortDistance = dijkstra(G, "E", "C")
print(shortDistance)  # E -- 3 --> F -- 3 --> C == 6
```

会了这个算法模板， 你就可以去 AC 743. 网络延迟时间 了。

完整代码：

```py
class Solution:
    def dijkstra(self, graph, start, end):
        heap = [(0, start)]
        visited = set()
        while heap:
            (cost, u) = heapq.heappop(heap)
            if u in visited:
                continue
            visited.add(u)
            if u == end:
                return cost
            for v, c in graph[u]:
                if v in visited:
                    continue
                next = cost + c
                heapq.heappush(heap, (next, v))
        return -1
    def networkDelayTime(self, times: List[List[int]], N: int, K: int) -> int:
        graph = collections.defaultdict(list)
        for fr, to, w in times:
            graph[fr - 1].append((to - 1, w))
        ans = -1
        for to in range(N):
            dist = self.dijkstra(graph, K - 1, to)
            if dist == -1: return -1
            ans = max(ans, dist)
        return ans
```

你学会了么？

> 如果是计算一个点到图中所有点的距离呢？我们的算法会有什么样的调整？

> 提示：你可以使用一个 dist 哈希表记录开始点到每个点的最短距离来完成。想出来的话，可以用力扣 882 题去验证一下哦~

#### floyd_warshall 算法

floyd_warshall 也可以**解决任意两个点距离**，即多源最短路径。

除此之外，贝尔曼-福特算法也是解决最短路径的经典动态规划算法。相比上面的 dijkstra 算法， 由于其计算过程会把中间运算结果保存起来防止重复计算，因此其特别适合**求图中任意两点的距离**，比如力扣的 1462. 课程安排 IV。除了这个优点。贝尔曼-福特算法相比于此算法最大的区别在于本算法是多源最短路径，而贝尔曼-福特则是单源最短路径。不管是复杂度和写法， 贝尔曼-福特算法都更简单，我们后面给大家介绍。

> 当然就不是说贝尔曼算法以及上面的 dijkstra 就不支持多源最短路径，你只需要加一个 for 循环枚举所有的起点罢了。

还有一个非常重要的点是 floyd_warshall 算法由于使用了**动态规划**的思想而不是贪心，因此其**可以处理负权重**的情况。动态规划的详细内容请参考之后的**动态规划专题**和**背包问题**。

floyd_warshall 的基本思想是动态规划。该算法的时间复杂度是 $O(N^3)$，空间复杂度是 $O(N^2)$，其中 N 为顶点个数。

算法也不难理解，简单来说就是： **i 到 j 的最短路径 = i 到 k 的最短路径 + k 到 j 的最短路径**的最小值。如下图：

![](https://tva1.sinaimg.cn/large/0081Kckwly1gk3qh59semj30ec05ptab.jpg)

u 到 v 的最短距离是 u 到 x 的最短距离 + x 到 v 的最短距离。上图 x 是 u 到 v 的必经之路，如果不是的话，我们需要多个中间节点的值，并取最小的。

算法的正确性不言而喻，因为从 i 到 j，要么直接到，要么经过图中的另外一个点 k，中间节点 k 可能有多个，经过中间点的情况取出最小的，自然就是 i 到 j 的最短距离。

> 思考题： 最长无环路径可以用动态规划来解么？

代码模板：

```py
# graph 是邻接矩阵，v 是顶点个数
# graph 形如： graph[u][v] = w
def floyd_warshall(graph, v):
    dist = [[float("inf") for _ in range(v)] for _ in range(v)]

    for i in range(v):
        for j in range(v):
            dist[i][j] = graph[i][j]

    # check vertex k against all other vertices (i, j)
    for k in range(v):
        # looping through rows of graph array
        for i in range(v):
            # looping through columns of graph array
            for j in range(v):
                if (
                    dist[i][k] != float("inf")
                    and dist[k][j] != float("inf")
                    and dist[i][k] + dist[k][j] < dist[i][j]
                ):
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist, v
```

我们回过头来看下如何套模板解决 力扣的 1462. 课程安排 IV，题目描述：

```
你总共需要上 n 门课，课程编号依次为 0 到 n-1 。

有的课会有直接的先修课程，比如如果想上课程 0 ，你必须先上课程 1 ，那么会以 [1,0] 数对的形式给出先修课程数对。

给你课程总数 n 和一个直接先修课程数对列表 prerequisite 和一个查询对列表 queries 。

对于每个查询对 queries[i] ，请判断 queries[i][0] 是否是 queries[i][1] 的先修课程。

请返回一个布尔值列表，列表中每个元素依次分别对应 queries 每个查询对的判断结果。

注意：如果课程 a 是课程 b 的先修课程且课程 b 是课程 c 的先修课程，那么课程 a 也是课程 c 的先修课程。

 

示例 1：



输入：n = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
输出：[false,true]
解释：课程 0 不是课程 1 的先修课程，但课程 1 是课程 0 的先修课程。
示例 2：

输入：n = 2, prerequisites = [], queries = [[1,0],[0,1]]
输出：[false,false]
解释：没有先修课程对，所以每门课程之间是独立的。
示例 3：



输入：n = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
输出：[true,true]
示例 4：

输入：n = 3, prerequisites = [[1,0],[2,0]], queries = [[0,1],[2,0]]
输出：[false,true]
示例 5：

输入：n = 5, prerequisites = [[0,1],[1,2],[2,3],[3,4]], queries = [[0,4],[4,0],[1,3],[3,0]]
输出：[true,false,true,false]
 

提示：

2 <= n <= 100
0 <= prerequisite.length <= (n * (n - 1) / 2)
0 <= prerequisite[i][0], prerequisite[i][1] < n
prerequisite[i][0] != prerequisite[i][1]
先修课程图中没有环。
先修课程图中没有重复的边。
1 <= queries.length <= 10^4
queries[i][0] != queries[i][1]

```

这道题也可以使用 floyd_warshall 来做。 你可以这么想， 如果从 i 到 j 的距离大于 0，那不就是先修课么。而这道题数据范围 queries 大概是 10 ^ 4 ， 用上面的 dijkstra 算法肯定超时，，因此 floyd_warshall 算法是明智的选择。

我这里直接套模板，稍微改下就过了。完整代码：

```py
class Solution:
    def floyd_warshall(self, dist, v):
        for k in range(v):
            for i in range(v):
                for j in range(v):
                    dist[i][j] = dist[i][j] or (dist[i][k] and dist[k][j])

        return dist

    def checkIfPrerequisite(self, n: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        graph = [[False] * n for _ in range(n)]
        ans = []

        for to, fr in prerequisites:
            graph[fr][to] = True
        dist = self.floyd_warshall(graph, n)
        for to, fr in queries:
            ans.append(bool(dist[fr][to]))
        return ans

```

如果这道题你可以解决了，我再推荐一道题给你 [1617. 统计子树中城市之间最大距离](https://leetcode-cn.com/problems/count-subtrees-with-max-distance-between-cities/)，国际版有一个题解代码挺清晰，挺好理解的，只不过没有使用状态压缩性能不是很好罢了，地址：https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities/discuss/1136596/Python-Floyd-Warshall-and-check-all-subtrees

#### 贝尔曼-福特算法

和上面的算法类似。这种解法主要解决单源最短路径，即图中某一点到其他点的最短距离。

其基本思想也是动态规划。

核心算法为：

- 初始化起点距离为 0
- 对图中的所有边进行**若干次**处理，直到稳定。处理的依据是：对于每一个有向边 (u,v)，如果 dist[u] + w 小于 dist[v]，那么意味着我们**找到了一条到达 v 更近的路**，更新之。
- 上面的若干次的上限是顶点 V 的个数，因此不妨直接进行 n 次处理。
- 最后检查一下是否存在负边引起的环。（注意）

举个例子。对于如下的一个图，存在一个 B -> C -> D -> B，这样 B 到 C 和 D 的距离理论上可以无限小。我们需要检测到这一种情况，并退出。

![](https://tva1.sinaimg.cn/large/008i3skNly1grc449csg0j30h705a3yt.jpg)

此算法时间复杂度：$O(V*E)$， 空间复杂度：$O(V)$。

Python 代码示例：

```py
# return -1 for not exsit
# else return dis map where dis[v] means for point s the least cost to point v
def bell_man(edges, s):
    dis = defaultdict(lambda: math.inf)
    dis[s] = 0
    for _ in range(n):
        for u, v, w in edges:
            if dis[u] + w < dis[v]:
                dis[v] = dis[u] + w

    for u, v, w in edges:
        if dis[u] + w < dis[v]:
            return -1

    return dis
```

推荐阅读：

- [bellman-ford-algorithm](https://www.programiz.com/dsa/bellman-ford-algorithm)

题目推荐：

- [Best Currency Path](https://binarysearch.com/problems/Best-Currency-Path)

### 拓扑排序

在计算机科学领域，有向图的拓扑排序是对其顶点的一种线性排序，使得对于从顶点 u 到顶点 v 的每个有向边 uv， u 在排序中都在之前。当且仅当图中没有定向环时（即有向无环图），才有可能进行拓扑排序。

典型的题目就是给你一堆课程，课程之间有先修关系，让你给出一种可行的学习路径方式，要求先修的课程要先学。任何有向无环图至少有一个拓扑排序。已知有算法可以在线性时间内，构建任何有向无环图的拓扑排序。

#### Kahn 算法

简单来说，假设 L 是存放结果的列表，先找到那些入度为零的节点，把这些节点放到 L 中，因为这些节点没有任何的父节点。然后把与这些节点相连的边从图中去掉，再寻找图中的入度为零的节点。对于新找到的这些入度为零的节点来说，他们的父节点已经都在 L 中了，所以也可以放入 L。重复上述操作，直到找不到入度为零的节点。如果此时 L 中的元素个数和节点总数相同，说明排序完成；如果 L 中的元素个数和节点总数不同，说明原图中存在环，无法进行拓扑排序。

```py
def topologicalSort(graph):
    """
    Kahn's Algorithm is used to find Topological ordering of Directed Acyclic Graph
    using BFS
    """
    indegree = [0] * len(graph)
    queue = []
    topo = []
    cnt = 0

    for key, values in graph.items():
        for i in values:
            indegree[i] += 1

    for i in range(len(indegree)):
        if indegree[i] == 0:
            queue.append(i)

    while queue:
        vertex = queue.pop(0)
        cnt += 1
        topo.append(vertex)
        for x in graph[vertex]:
            indegree[x] -= 1
            if indegree[x] == 0:
                queue.append(x)

    if cnt != len(graph):
        print("Cycle exists")
    else:
        print(topo)


# Adjacency List of Graph
graph = {0: [1, 2], 1: [3], 2: [3], 3: [4, 5], 4: [], 5: []}
topologicalSort(graph)
```

### 最小生成树

Kruskal 和 Prim 是两个经典的求最小生成树的算法，本节我们就来了解一下它们。

什么是最小生成树，这两个算法又是如何计算最小生成树的呢？

首先我们来看下什么是生成树。 生成树是一个图的一部分，生成树包含图的**所有顶点**，且不包含环，这也是为什么叫做生成树，而不是生成图的原因。你可以将生成树看成是根节点不确定的多叉树。

最小生成树是在生成树的基础上加了**最小**关键字，是最小权重生成树的简称。其指的是对于带权图来说，生成树的权重是其所有边的权重和，那么最小生成树就是权重和最小的生成树，由此可看出，不管是生成树还是最小生成树都可能不唯一。

这在实际生活中有很强的价值。比如我要修建一个地铁，并覆盖 n 个站，如果建造才能使得花费最小？由于每个站之间的路线不同，因此造价也不一样，因此这就是一个最小生成树的实际使用场景，类似的例子还有很多。

![](https://tva1.sinaimg.cn/large/008eGmZEly1gmst4yvz7sj308c06qjrl.jpg)
（图来自维基百科）

#### Kruskal

Kruskal 算法也被形象地称为**加边法**，每前进一次都选择权重最小的边，加入到结果集。为了防止环的产生（增加环是无意义的，只要权重是正数，一定会使结果更差），我们需要检查下当前选择的边是否和已经选择的边联通了。如果联通了，是没有必要选取的，因为这会使得环产生。因此算法上，我们可使用并查集辅助完成。下面算法中的 find_parent 部分，实际上就是并查集的核心代码，只是我们没有将其封装并使用罢了。

Kruskal 具体算法：

1. 对边进行排序
2. 将 n 个顶点初始化为 n 个联通域
3. 按照权值从小到大选择边加入到结果集，如果当前选择的边是否和已经选择的边联通了，则放弃选择，否则进行选择，加入到结果集。
4. 重复 3 直到我们找到了一个联通域大小为 n 的子图

代码模板：

```py
from typing import List, Tuple


def kruskal(num_nodes: int, edges: List[Tuple[int, int, int]]) -> int:
    """
    >>> kruskal(4, 3, [(0, 1, 3), (1, 2, 5), (2, 3, 1)])
    [(2, 3, 1), (0, 1, 3), (1, 2, 5)]

    >>> kruskal(4, 5, [(0, 1, 3), (1, 2, 5), (2, 3, 1), (0, 2, 1), (0, 3, 2)])
    [(2, 3, 1), (0, 2, 1), (0, 1, 3)]

    >>> kruskal(4, 6, [(0, 1, 3), (1, 2, 5), (2, 3, 1), (0, 2, 1), (0, 3, 2),
    ... (2, 1, 1)])
    [(2, 3, 1), (0, 2, 1), (2, 1, 1)]
    """
    edges = sorted(edges, key=lambda edge: edge[2])

    parent = list(range(num_nodes))

    def find_parent(i):
        if i != parent[i]:
            parent[i] = find_parent(parent[i])
        return parent[i]

    minimum_spanning_tree_cost = 0
    minimum_spanning_tree = []

    for edge in edges:
        parent_a = find_parent(edge[0])
        parent_b = find_parent(edge[1])
        if parent_a != parent_b:
            minimum_spanning_tree_cost += edge[2]
            minimum_spanning_tree.append(edge)
            parent[parent_a] = parent_b

    return minimum_spanning_tree


if __name__ == "__main__":  # pragma: no cover
    num_nodes, num_edges = list(map(int, input().strip().split()))
    edges = []

    for _ in range(num_edges):
        node1, node2, cost = [int(x) for x in input().strip().split()]
        edges.append((node1, node2, cost))

    kruskal(num_nodes, edges)
```

#### Prim

Prim 算法也被形象地称为**加点法**，每前进一次都选择权重最小的点，加入到结果集。形象地看就像一个不断生长的真实世界的树。

Prim 具体算法：

1. 初始化最小生成树点集 MV 为图中任意一个顶点，最小生成树边集 ME 为空。我们的目标是将 MV 填充到 和 V 一样，而边集则根据 MV 的产生自动计算。
2. 在集合 E 中 （集合 E 为原始图的边集）选取最小的边 <u, v> 其中 u 为 MV 中已有的元素，而 v 为 MV 中不存在的元素（像不像上面说的**不断生长的真实世界的树**），将 v 加入到 MV，将 <u, v> 加到 ME。
3. 重复 2 直到我们找到了一个联通域大小为 n 的子图

算法模板：

> 为了体现完整性，代码中关于堆的部分采用了手动实现的方式。

```py
import sys
from collections import defaultdict


def PrimsAlgorithm(l):  # noqa: E741

    nodePosition = []

    def get_position(vertex):
        return nodePosition[vertex]

    def set_position(vertex, pos):
        nodePosition[vertex] = pos

    def top_to_bottom(heap, start, size, positions):
        if start > size // 2 - 1:
            return
        else:
            if 2 * start + 2 >= size:
                m = 2 * start + 1
            else:
                if heap[2 * start + 1] < heap[2 * start + 2]:
                    m = 2 * start + 1
                else:
                    m = 2 * start + 2
            if heap[m] < heap[start]:
                temp, temp1 = heap[m], positions[m]
                heap[m], positions[m] = heap[start], positions[start]
                heap[start], positions[start] = temp, temp1

                temp = get_position(positions[m])
                set_position(positions[m], get_position(positions[start]))
                set_position(positions[start], temp)

                top_to_bottom(heap, m, size, positions)

    # Update function if value of any node in min-heap decreases
    def bottom_to_top(val, index, heap, position):
        temp = position[index]

        while index != 0:
            if index % 2 == 0:
                parent = int((index - 2) / 2)
            else:
                parent = int((index - 1) / 2)

            if val < heap[parent]:
                heap[index] = heap[parent]
                position[index] = position[parent]
                set_position(position[parent], index)
            else:
                heap[index] = val
                position[index] = temp
                set_position(temp, index)
                break
            index = parent
        else:
            heap[0] = val
            position[0] = temp
            set_position(temp, 0)

    def heapify(heap, positions):
        start = len(heap) // 2 - 1
        for i in range(start, -1, -1):
            top_to_bottom(heap, i, len(heap), positions)

    def deleteMinimum(heap, positions):
        temp = positions[0]
        heap[0] = sys.maxsize
        top_to_bottom(heap, 0, len(heap), positions)
        return temp

    visited = [0 for i in range(len(l))]
    Nbr_TV = [-1 for i in range(len(l))]  # Neighboring Tree Vertex of selected vertex
    # Minimum Distance of explored vertex with neighboring vertex of partial tree
    # formed in graph
    Distance_TV = []  # Heap of Distance of vertices from their neighboring vertex
    Positions = []

    for x in range(len(l)):
        p = sys.maxsize
        Distance_TV.append(p)
        Positions.append(x)
        nodePosition.append(x)

    TreeEdges = []
    visited[0] = 1
    Distance_TV[0] = sys.maxsize
    for x in l[0]:
        Nbr_TV[x[0]] = 0
        Distance_TV[x[0]] = x[1]
    heapify(Distance_TV, Positions)

    for i in range(1, len(l)):
        vertex = deleteMinimum(Distance_TV, Positions)
        if visited[vertex] == 0:
            TreeEdges.append((Nbr_TV[vertex], vertex))
            visited[vertex] = 1
            for v in l[vertex]:
                if visited[v[0]] == 0 and v[1] < Distance_TV[get_position(v[0])]:
                    Distance_TV[get_position(v[0])] = v[1]
                    bottom_to_top(v[1], get_position(v[0]), Distance_TV, Positions)
                    Nbr_TV[v[0]] = vertex
    return TreeEdges


if __name__ == "__main__":  # pragma: no cover
    # < --------- Prims Algorithm --------- >
    n = int(input("Enter number of vertices: ").strip())
    e = int(input("Enter number of edges: ").strip())
    adjlist = defaultdict(list)
    for x in range(e):
        l = [int(x) for x in input().strip().split()]  # noqa: E741
        adjlist[l[0]].append([l[1], l[2]])
        adjlist[l[1]].append([l[0], l[2]])
    print(PrimsAlgorithm(adjlist))
```

#### 两种算法比较

为了后面描述方便，我们令 V 为图中的顶点数， E 为图中的边数。那么 KruKal 的算法复杂度是 $O(ElogE)$，Prim 的算法时间复杂度为 $E + VlogV$。

KruKal 是基于图的联通性贪心算法。而 Prim 则是基于堆的贪心算法。

#### A 星寻路算法

A 星寻路解决的问题是在一个二维的表格中找出任意两点的最短距离或者最短路径。常用于游戏中的 NPC 的移动计算，是一种常用启发式算法。一般这种题目都会有障碍物。除了障碍物，力扣的题目还会增加一些限制，使得题目难度增加。

这种题目一般都是力扣的困难难度。理解起来不难， 但是要完整地没有 bug 地写出来却不那么容易。

在该算法中，我们从起点开始，检查其相邻的四个方格并尝试扩展，直至找到目标。A 星寻路算法的寻路方式不止一种，感兴趣的可以自行了解一下。

公式表示为： f(n)=g(n)+h(n)。

其中：

- f(n) 是从初始状态经由状态 n 到目标状态的估计代价，

- g(n) 是在状态空间中从初始状态到状态 n 的实际代价，

- h(n) 是从状态 n 到目标状态的最佳路径的估计代价。

如果 g(n)为 0，即只计算任意顶点 n 到目标的评估函数 h(n)，而不计算起点到顶点 n 的距离，则算法转化为使用贪心策略的最良优先搜索，速度最快，但可能得不出最优解；
如果 h(n)不大于顶点 n 到目标顶点的实际距离，则一定可以求出最优解，而且 h(n)越小，需要计算的节点越多，算法效率越低，常见的评估函数有——欧几里得距离、曼哈顿距离、切比雪夫距离；
如果 h(n)为 0，即只需求出起点到任意顶点 n 的最短路径 g(n)，而不计算任何评估函数 h(n)，则转化为单源最短路径问题，即 Dijkstra 算法，此时需要计算最多的顶点；

这里有一个重要的概念是**估价算法**，一般我们使用 **曼哈顿距离**来进行估价，即 `H(n) = D * (abs ( n.x – goal.x ) + abs ( n.y – goal.y ) )`。

![](https://tva1.sinaimg.cn/large/0081Kckwly1gjy9j7k3jdg305u05umy9.gif)

（图来自维基百科 https://zh.wikipedia.org/wiki/A*%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95 ）

一个完整的代码模板：

```py
grid = [
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],  # 0 are free path whereas 1's are obstacles
    [0, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 0],
]

"""
heuristic = [[9, 8, 7, 6, 5, 4],
             [8, 7, 6, 5, 4, 3],
             [7, 6, 5, 4, 3, 2],
             [6, 5, 4, 3, 2, 1],
             [5, 4, 3, 2, 1, 0]]"""

init = [0, 0]
goal = [len(grid) - 1, len(grid[0]) - 1]  # all coordinates are given in format [y,x]
cost = 1

# the cost map which pushes the path closer to the goal
heuristic = [[0 for row in range(len(grid[0]))] for col in range(len(grid))]
for i in range(len(grid)):
    for j in range(len(grid[0])):
        heuristic[i][j] = abs(i - goal[0]) + abs(j - goal[1])
        if grid[i][j] == 1:
            heuristic[i][j] = 99  # added extra penalty in the heuristic map


# the actions we can take
delta = [[-1, 0], [0, -1], [1, 0], [0, 1]]  # go up  # go left  # go down  # go right


# function to search the path
def search(grid, init, goal, cost, heuristic):

    closed = [
        [0 for col in range(len(grid[0]))] for row in range(len(grid))
    ]  # the reference grid
    closed[init[0]][init[1]] = 1
    action = [
        [0 for col in range(len(grid[0]))] for row in range(len(grid))
    ]  # the action grid

    x = init[0]
    y = init[1]
    g = 0
    f = g + heuristic[init[0]][init[0]]
    cell = [[f, g, x, y]]

    found = False  # flag that is set when search is complete
    resign = False  # flag set if we can't find expand

    while not found and not resign:
        if len(cell) == 0:
            return "FAIL"
        else:  # to choose the least costliest action so as to move closer to the goal
            cell.sort()
            cell.reverse()
            next = cell.pop()
            x = next[2]
            y = next[3]
            g = next[1]

            if x == goal[0] and y == goal[1]:
                found = True
            else:
                for i in range(len(delta)):  # to try out different valid actions
                    x2 = x + delta[i][0]
                    y2 = y + delta[i][1]
                    if x2 >= 0 and x2 < len(grid) and y2 >= 0 and y2 < len(grid[0]):
                        if closed[x2][y2] == 0 and grid[x2][y2] == 0:
                            g2 = g + cost
                            f2 = g2 + heuristic[x2][y2]
                            cell.append([f2, g2, x2, y2])
                            closed[x2][y2] = 1
                            action[x2][y2] = i
    invpath = []
    x = goal[0]
    y = goal[1]
    invpath.append([x, y])  # we get the reverse path from here
    while x != init[0] or y != init[1]:
        x2 = x - delta[action[x][y]][0]
        y2 = y - delta[action[x][y]][1]
        x = x2
        y = y2
        invpath.append([x, y])

    path = []
    for i in range(len(invpath)):
        path.append(invpath[len(invpath) - 1 - i])
    print("ACTION MAP")
    for i in range(len(action)):
        print(action[i])

    return path


a = search(grid, init, goal, cost, heuristic)
for i in range(len(a)):
    print(a[i])
```

典型题目[1263. 推箱子](https://leetcode-cn.com/problems/minimum-moves-to-move-a-box-to-their-target-location/)

### 二分图

二分图我在这两道题中讲过了，大家看一下之后把这两道题做一下就行了。其实这两道题和一道题没啥区别。

- [0886. 可能的二分法](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/medium/886.possible-bipartition)
- [0785. 判断二分图](https://leetcode-solution-leetcode-pp.gitbook.io/leetcode-solution/medium/785.is-graph-bipartite)

推荐顺序为： 先看 886 再看 785。

## 参考

- [维基百科 - 最小生成树](https://zh.wikipedia.org/wiki/%E6%9C%80%E5%B0%8F%E7%94%9F%E6%88%90%E6%A0%91)

## 总结

理解图的常见概念，我们就算入门了。接下来，我们就可以做题了，一般的图题目第一步都是建图，第二步都是基于第一步的图进行遍历以寻找可行解。

图的题目相对而言比较难，尤其是代码书写层面。但是就面试题目而言， 图的题目类型却不多，而且很多题目都是套模板就可以解决。因此建议大家多练习模板，并自己多手敲，确保可以自己敲出来。
