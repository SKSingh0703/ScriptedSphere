import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, Label, Table, Badge, Progress, Card, Button } from "flowbite-react";
import { FaYoutube, FaCheck, FaTimes } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces } from "react-icons/si";
import { HiFire, HiTrendingUp, HiClock } from "react-icons/hi";
import Loader from "./Loader";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [progress, setProgress] = useState({});
  const [progressStats, setProgressStats] = useState({ total: 0, completed: 0, percentage: 0 });
  const [totalProblems, setTotalProblems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const [filter, setFilter] = useState('all'); // all, easy, medium, hard
  const [sortBy, setSortBy] = useState('default'); // default, difficulty, topic

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/getposts`);
        if (res.ok) {
          const data = await res.json();
          setUserPosts(data.posts);
          setTotalProblems(data.posts.length);
          if (data.posts.length <= 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch('/api/progress/get');
        if (res.ok) {
          const data = await res.json();
          setProgress(data.progress);
          
          // Calculate stats from progress data
          const completedCount = Object.values(data.progress).filter(p => p.completed).length;
          const percentage = totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;
          
          setProgressStats({
            total: totalProblems,
            completed: completedCount,
            percentage: percentage
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser && totalProblems > 0) {
      fetchProgress();
    }
  }, [currentUser, totalProblems]);

  const handleProgressUpdate = async (postId, completed) => {
    try {
      const res = await fetch('/api/progress/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, completed }),
      });

      if (res.ok) {
        const data = await res.json();
        setProgress(prev => ({
          ...prev,
          [postId]: { completed, completedAt: data.progress.completedAt }
        }));
        
        // Update stats immediately
        const currentCompleted = Object.values(progress).filter(p => p.completed).length;
        const newCompleted = completed ? currentCompleted + 1 : currentCompleted - 1;
        const percentage = totalProblems > 0 ? Math.round((newCompleted / totalProblems) * 100) : 0;
        
        setProgressStats({
          total: totalProblems,
          completed: newCompleted,
          percentage: percentage
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}&limit=150`);
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'failure';
      default: return 'gray';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'leetcode':
        return <SiLeetcode className="text-yellow-600 h-6 w-6" />;
      case 'geekForGeeks':
        return <SiGeeksforgeeks className="text-green-500 h-6 w-6" />;
      case 'codeforces':
        return <SiCodeforces className="text-blue-600 h-6 w-6" />;
      default:
        return <SiLeetcode className="text-gray-500 h-6 w-6" />;
    }
  };

  const filteredPosts = userPosts.filter(post => {
    if (filter === 'all') return true;
    return post.difficulty === filter;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'topic':
        return a.topic.localeCompare(b.topic);
      default:
        return 0;
    }
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-5 space-y-6">
      {/* Progress Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">Total Problems</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-100">{totalProblems}</p>
            </div>
            <HiTrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 dark:text-green-300">Completed</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-100">{progressStats.completed}</p>
            </div>
            <FaCheck className="h-8 w-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Overall Progress</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {progressStats.completed} of {totalProblems} problems
            </span>
          </div>
          <Progress 
            progress={progressStats.percentage} 
            color="blue" 
            size="lg"
            className="h-3"
          />
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            {progressStats.percentage}% Complete
          </div>
        </div>
      </Card>

      {/* Filters and Controls */}
      <Card>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <Button
              color={filter === 'all' ? 'blue' : 'gray'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              color={filter === 'easy' ? 'green' : 'gray'}
              size="sm"
              onClick={() => setFilter('easy')}
            >
              Easy
            </Button>
            <Button
              color={filter === 'medium' ? 'yellow' : 'gray'}
              size="sm"
              onClick={() => setFilter('medium')}
            >
              Medium
            </Button>
            <Button
              color={filter === 'hard' ? 'red' : 'gray'}
              size="sm"
              onClick={() => setFilter('hard')}
            >
              Hard
            </Button>
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <option value="default">Default</option>
              <option value="difficulty">Difficulty</option>
              <option value="topic">Topic</option>
            </select>
          </div>
        </div>
      </Card>

      {/* DSA Sheet Table */}
      {sortedPosts.length > 0 ? (
        <Card>
          <div className="overflow-x-auto">
            <Table hoverable className="min-w-full">
              <Table.Head>
                <Table.HeadCell className="w-16">Status</Table.HeadCell>
                <Table.HeadCell>Problem</Table.HeadCell>
                <Table.HeadCell>Topic</Table.HeadCell>
                <Table.HeadCell className="w-20">Solution</Table.HeadCell>
                <Table.HeadCell className="w-20">Platform</Table.HeadCell>
                <Table.HeadCell className="w-24">Difficulty</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {sortedPosts.map((post, key) => (
                  <Table.Row 
                    key={key} 
                    className={`bg-white dark:border-gray-700 dark:bg-gray-800 ${
                      progress[post._id]?.completed ? 'bg-green-50 dark:bg-green-900/20' : ''
                    }`}
                  >
                    <Table.Cell>
                      <div className="flex items-center">
                        <Checkbox
                          checked={progress[post._id]?.completed || false}
                          onChange={(e) => handleProgressUpdate(post._id, e.target.checked)}
                          className="h-5 w-5"
                        />
                        {progress[post._id]?.completed && (
                          <FaCheck className="ml-2 h-4 w-4 text-green-600" />
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="max-w-xs">
                        <a
                          href={post.question}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium line-clamp-2 hover:underline"
                        >
                          {post.title}
                        </a>
                        {progress[post._id]?.completedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Completed {new Date(progress[post._id].completedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color="info" size="sm">
                        {post.topic}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {post.youtube && (
                        <a
                          href={post.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <FaYoutube className="h-5 w-5" />
                        </a>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <a
                        href={post.question}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        {getPlatformIcon(post.platform)}
                      </a>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge color={getDifficultyColor(post.difficulty)} size="sm">
                        {post.difficulty.charAt(0).toUpperCase() + post.difficulty.slice(1)}
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          {showMore && (
            <div className="mt-4 text-center">
              <Button
                onClick={handleShowMore}
                color="blue"
                size="sm"
                className="px-6"
              >
                Show More Problems
              </Button>
            </div>
          )}
        </Card>
      ) : (
        <Card>
          <div className="text-center py-12">
            <HiClock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              No problems found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or check back later for new problems.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}