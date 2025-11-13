import React, { useState, useEffect } from 'react';
import { Heart, SkipForward, TrendingUp, User, Home, Flame, Clock, UserPlus, ThumbsDown, Store, Trophy, Coins, DollarSign, Gift, Award, Star } from 'lucide-react';

const DumbfundedApp = () => {
  const [currentView, setCurrentView] = useState('feed');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // Currency & Wallet - Two separate currencies
  const [dumbsUps, setDumbsUps] = useState(500); // FREE currency earned through engagement
  const [dumbCoins, setDumbCoins] = useState(0); // PREMIUM currency bought with real money
  const [totalEarned, setTotalEarned] = useState(0); // Total free DumbsUps earned
  const [totalPurchased, setTotalPurchased] = useState(0); // Total DumbCoins purchased
  const [totalDonatedUps, setTotalDonatedUps] = useState(0); // Donated free currency
  const [totalDonatedCoins, setTotalDonatedCoins] = useState(0); // Donated premium currency
  
  const [userEngagement, setUserEngagement] = useState({
    likes: [],
    skips: [],
    notInterested: [],
    following: [],
    donationsUps: {}, // Tracks free currency donations per creator
    donationsCoins: {}, // Tracks premium currency donations per creator
    watchTimes: {},
    tagWeights: {}
  });

  const [baseVideos] = useState([
    {
      id: 1,
      title: "24-Hour Challenge in a Treehouse",
      creator: "AdventureMax",
      tags: ["outdoor", "endurance"],
      thumbnail: "🏕️",
      views: 15420,
      engagement: 892,
      fundsRaised: 2340,
      dumbsUpsReceived: 15420,
      dumbCoinsReceived: 117
    },
    {
      id: 2,
      title: "Eat Hot Wings Every Hour",
      creator: "SpiceKing",
      tags: ["food", "spicy"],
      thumbnail: "🔥",
      views: 23100,
      engagement: 1456,
      fundsRaised: 4560,
      dumbsUpsReceived: 23100,
      dumbCoinsReceived: 228
    },
    {
      id: 3,
      title: "Learn a Backflip in One Day",
      creator: "FlipMaster",
      tags: ["athletic", "skill"],
      thumbnail: "🤸",
      views: 8750,
      engagement: 654,
      fundsRaised: 1890,
      dumbsUpsReceived: 8750,
      dumbCoinsReceived: 94
    },
    {
      id: 4,
      title: "Beat Dark Souls Blindfolded",
      creator: "GamerGrit",
      tags: ["gaming", "hardcore"],
      thumbnail: "🎮",
      views: 31200,
      engagement: 2103,
      fundsRaised: 6780,
      dumbsUpsReceived: 31200,
      dumbCoinsReceived: 339
    },
    {
      id: 5,
      title: "Run 5K Every Time Chat Says Run",
      creator: "MarathonMike",
      tags: ["fitness", "interactive"],
      thumbnail: "🏃",
      views: 12300,
      engagement: 987,
      fundsRaised: 3210,
      dumbsUpsReceived: 12300,
      dumbCoinsReceived: 160
    },
    {
      id: 6,
      title: "Draw 100 Portraits in 24 Hours",
      creator: "ArtistAce",
      tags: ["creative", "art"],
      thumbnail: "🎨",
      views: 9870,
      engagement: 743,
      fundsRaised: 2100,
      dumbsUpsReceived: 9870,
      dumbCoinsReceived: 105
    }
  ]);

  const [videos, setVideos] = useState([]);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationType, setDonationType] = useState('ups'); // 'ups' or 'coins'

  const storeItems = [
    { id: 1, name: "25 DumbCoins", price: 5.00, dumbCoins: 25, icon: "🪙" },
    { id: 2, name: "50 DumbCoins", price: 10.00, dumbCoins: 50, icon: "💰", popular: true },
    { id: 3, name: "125 DumbCoins", price: 25.00, dumbCoins: 125, icon: "💎" },
    { id: 4, name: "250 DumbCoins", price: 50.00, dumbCoins: 250, icon: "👑", bestValue: true },
    { id: 5, name: "625 DumbCoins", price: 125.00, dumbCoins: 625, icon: "🏆" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchTime(prev => prev + 1);
      
      if (watchTime > 0 && watchTime % 10 === 0) {
        earnDumbsUps(1, 'Watch time reward');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentVideoIndex, watchTime]);

  useEffect(() => {
    const storedUser = { id: 'user_001', name: 'Demo User' };
    setCurrentUser(storedUser);
    setVideos([...baseVideos]);
  }, [baseVideos]);

  useEffect(() => {
    const totalEngagements = userEngagement.likes.length + 
                            userEngagement.skips.length + 
                            userEngagement.notInterested.length;
    
    if (totalEngagements >= 10 && !hasCompletedOnboarding) {
      setHasCompletedOnboarding(true);
      earnDumbsUps(50, 'Onboarding bonus!');
    }
  }, [userEngagement, hasCompletedOnboarding]);

  // Earn FREE DumbsUps with notification
  const earnDumbsUps = (amount, reason) => {
    setDumbsUps(prev => prev + amount);
    setTotalEarned(prev => prev + amount);
  };

  // Purchase PREMIUM DumbCoins
  const purchaseDumbCoins = (amount, price) => {
    // In production, this would trigger payment gateway
    setDumbCoins(prev => prev + amount);
    setTotalPurchased(prev => prev + amount);
    alert(`✅ Successfully purchased ${amount} DumbCoins for ${price.toFixed(2)}!`);
  };

  const handleLike = () => {
    const video = videos[currentVideoIndex];
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        likes: [...prev.likes, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      video.tags.forEach(tag => {
        newEngagement.tagWeights[tag] = (newEngagement.tagWeights[tag] || 0) + 1;
      });

      return newEngagement;
    });

    earnDumbsUps(5, 'Liked a video');
    nextVideo();
  };

  const handleSkip = () => {
    const video = videos[currentVideoIndex];
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        skips: [...prev.skips, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      if (watchTime < 5) {
        video.tags.forEach(tag => {
          newEngagement.tagWeights[tag] = (newEngagement.tagWeights[tag] || 0) - 0.5;
        });
      }

      return newEngagement;
    });

    earnDumbsUps(1, 'Engagement reward');
    nextVideo();
  };

  const handleNotInterested = () => {
    const video = videos[currentVideoIndex];
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        notInterested: [...prev.notInterested, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      video.tags.forEach(tag => {
        newEngagement.tagWeights[tag] = (newEngagement.tagWeights[tag] || 0) - 2;
      });

      return newEngagement;
    });

    nextVideo();
  };

  const handleFollow = () => {
    const video = videos[currentVideoIndex];
    
    setUserEngagement(prev => {
      if (prev.following.includes(video.creator)) {
        return prev;
      }

      earnDumbsUps(10, `Followed ${video.creator}`);
      return {
        ...prev,
        following: [...prev.following, video.creator]
      };
    });
  };

  const handleDonate = (amount, type) => {
    const video = videos[currentVideoIndex];
    
    if (type === 'ups') {
      // Donate FREE DumbsUps
      if (dumbsUps >= amount) {
        setDumbsUps(prev => prev - amount);
        setTotalDonatedUps(prev => prev + amount);
        
        setUserEngagement(prev => ({
          ...prev,
          donationsUps: {
            ...prev.donationsUps,
            [video.creator]: (prev.donationsUps[video.creator] || 0) + amount
          }
        }));
        
        // Update video funds (convert 1 DumbsUp = $0.01 value)
        const updatedVideos = videos.map(v => 
          v.id === video.id 
            ? { ...v, fundsRaised: v.fundsRaised + (amount * 0.01) }
            : v
        );
        setVideos(updatedVideos);
        
        setShowDonationModal(false);
        alert(`✅ Donated ${amount} DumbsUps (≈${(amount * 0.01).toFixed(2)}) to ${video.creator}!`);
      } else {
        alert('❌ Not enough DumbsUps! Keep engaging to earn more.');
      }
    } else if (type === 'coins') {
      // Donate PREMIUM DumbCoins
      if (dumbCoins >= amount) {
        setDumbCoins(prev => prev - amount);
        setTotalDonatedCoins(prev => prev + amount);
        
        setUserEngagement(prev => ({
          ...prev,
          donationsCoins: {
            ...prev.donationsCoins,
            [video.creator]: (prev.donationsCoins[video.creator] || 0) + amount
          }
        }));
        
        // Update video funds (convert 1 DumbCoin = $0.20 value, since 5 coins = $1)
        const updatedVideos = videos.map(v => 
          v.id === video.id 
            ? { ...v, fundsRaised: v.fundsRaised + (amount * 0.20) }
            : v
        );
        setVideos(updatedVideos);
        
        setShowDonationModal(false);
        alert(`✅ Donated ${amount} DumbCoins (≈${(amount * 0.20).toFixed(2)}) to ${video.creator}!`);
      } else {
        alert('❌ Not enough DumbCoins! Visit the store to purchase more.');
      }
    }
  };

  const nextVideo = () => {
    setWatchTime(0);
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  const currentVideo = videos[currentVideoIndex];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <header className="bg-black bg-opacity-40 backdrop-blur-md border-b border-purple-500 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="text-orange-400" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Dumbfunded
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <Coins size={20} />
              <span className="font-bold">{dumbsUps.toLocaleString()}</span>
              <span className="text-sm">DumbsUps</span>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <DollarSign size={20} />
              <span className="font-bold">{dumbCoins.toLocaleString()}</span>
              <span className="text-sm">DumbCoins</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-800 bg-opacity-50 px-4 py-2 rounded-full">
              <User size={20} />
              <span className="text-sm">{currentUser?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex space-x-4 mb-6">
          <button
            onClick={() => setCurrentView('feed')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'feed'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Home size={20} />
            <span>Feed</span>
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'profile'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Trophy size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setCurrentView('store')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'store'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Store size={20} />
            <span>Store</span>
          </button>
        </nav>

        {currentView === 'feed' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500 border-opacity-30 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{currentVideo.thumbnail}</div>
                    <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                    <p className="text-purple-300">@{currentVideo.creator}</p>
                    <div className="mt-2 flex items-center justify-center space-x-2 text-sm">
                      <Coins className="text-yellow-400" size={16} />
                      <span className="text-yellow-400 font-bold">{currentVideo.fundsRaised.toLocaleString()} raised</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleFollow}
                    disabled={userEngagement.following.includes(currentVideo.creator)}
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold flex items-center space-x-2 transition ${
                      userEngagement.following.includes(currentVideo.creator)
                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                    }`}
                  >
                    <UserPlus size={18} />
                    <span>{userEngagement.following.includes(currentVideo.creator) ? 'Following' : 'Follow +10'}</span>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-purple-300">
                      <span>{currentVideo.views.toLocaleString()} views</span>
                      <span className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{watchTime}s</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentVideo.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-700 bg-opacity-50 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={handleLike}
                      className="col-span-2 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <Heart size={24} />
                      <span>Like +5</span>
                    </button>
                    <button
                      onClick={handleSkip}
                      className="bg-purple-800 bg-opacity-60 hover:bg-opacity-80 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <SkipForward size={20} />
                      <span>Skip</span>
                    </button>
                    <button
                      onClick={handleNotInterested}
                      className="bg-red-900 bg-opacity-60 hover:bg-opacity-80 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <ThumbsDown size={20} />
                      <span>Not Interested</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowDonationModal(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                  >
                    <Gift size={24} />
                    <span>Donate DumbsUps</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                <h3 className="text-xl font-bold mb-4">Wallet</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-yellow-600 bg-opacity-20 p-3 rounded-lg">
                    <span className="text-yellow-300">DumbsUps (Free)</span>
                    <span className="font-bold text-yellow-400">{dumbsUps}</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-600 bg-opacity-20 p-3 rounded-lg">
                    <span className="text-green-300">DumbCoins (Premium)</span>
                    <span className="font-bold text-green-400">{dumbCoins}</span>
                  </div>
                  <div className="text-xs text-purple-400 mt-2">
                    • Earn DumbsUps free by engaging<br/>
                    • Purchase DumbCoins in Store
                  </div>
                </div>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                <h3 className="text-xl font-bold mb-4">Earnings & Donations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Ups Earned</span>
                    <span className="font-bold text-green-400">{totalEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Coins Purchased</span>
                    <span className="font-bold text-blue-400">{totalPurchased}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Ups Donated</span>
                    <span className="font-bold text-pink-400">{totalDonatedUps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Coins Donated</span>
                    <span className="font-bold text-emerald-400">{totalDonatedCoins}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                <h3 className="text-xl font-bold mb-4">Your Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Likes</span>
                    <span className="font-bold text-pink-400">{userEngagement.likes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Following</span>
                    <span className="font-bold text-green-400">{userEngagement.following.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-8 border border-purple-500 border-opacity-30">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{currentUser?.name}</h2>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Coins size={20} className="text-yellow-400" />
                    <span>{dumbsUps.toLocaleString()} DumbsUps</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-400">{dumbsUps}</div>
                  <div className="text-sm text-purple-300 mt-2">DumbsUps (Free)</div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400">{dumbCoins}</div>
                  <div className="text-sm text-purple-300 mt-2">DumbCoins (Premium)</div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-400">{userEngagement.likes.length}</div>
                  <div className="text-sm text-purple-300 mt-2">Videos Liked</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-yellow-400">Free Currency Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Total Earned</span>
                      <span className="font-bold">{totalEarned}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Total Donated</span>
                      <span className="font-bold">{totalDonatedUps}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-green-400">Premium Currency Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Total Purchased</span>
                      <span className="font-bold">{totalPurchased}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Total Donated</span>
                      <span className="font-bold">{totalDonatedCoins}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-4">
                      <span className="text-purple-400">Value Donated</span>
                      <span className="text-emerald-400 font-bold">${(totalDonatedCoins * 0.20).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Tag Preferences</h3>
              <div className="space-y-3">
                {Object.entries(userEngagement.tagWeights)
                  .sort(([, a], [, b]) => b - a)
                  .map(([tag, weight]) => (
                    <div key={tag} className="flex items-center justify-between bg-purple-900 bg-opacity-30 p-4 rounded-lg">
                      <span className="font-semibold">#{tag}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-purple-900 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full ${weight > 0 ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-red-600'}`}
                            style={{ width: `${Math.min(Math.abs(weight) * 20, 100)}%` }}
                          />
                        </div>
                        <span className={`font-bold ${weight > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {weight > 0 ? '+' : ''}{weight.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'store' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-8 border border-purple-500 border-opacity-30">
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Store size={32} className="text-green-400" />
                <span>DumbCoins Store</span>
              </h2>
              <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg mb-6 border border-green-500 border-opacity-30">
                <p className="text-green-300 font-semibold">💎 DumbCoins are premium currency</p>
                <p className="text-sm text-purple-300 mt-1">Rate: 5 DumbCoins = $1.00 USD</p>
                <p className="text-xs text-purple-400 mt-2">Support creators with DumbCoins - they have 20x more value than free DumbsUps!</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeItems.map(item => (
                  <div
                    key={item.id}
                    className={`bg-purple-900 bg-opacity-30 p-6 rounded-xl border-2 transition hover:scale-105 ${
                      item.popular ? 'border-yellow-400' : item.bestValue ? 'border-green-400' : 'border-purple-500 border-opacity-30'
                    }`}
                  >
                    {item.popular && (
                      <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        POPULAR
                      </div>
                    )}
                    {item.bestValue && (
                      <div className="bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        BEST VALUE
                      </div>
                    )}
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">${item.price.toFixed(2)}</div>
                    <div className="text-sm text-purple-300 mb-4">{item.dumbCoins} DumbCoins</div>
                    <button 
                      onClick={() => purchaseDumbCoins(item.dumbCoins, item.price)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold transition"
                    >
                      Purchase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setShowDonationModal(false)}>
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl max-w-md w-full border border-purple-500" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Donate to {currentVideo.creator}</h3>
            
            {/* Currency Type Selection */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setDonationType('ups')}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  donationType === 'ups'
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
                    : 'bg-purple-800 bg-opacity-50 hover:bg-opacity-70'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Coins size={20} />
                  <span>DumbsUps</span>
                </div>
                <div className="text-xs mt-1">Balance: {dumbsUps}</div>
              </button>
              <button
                onClick={() => setDonationType('coins')}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  donationType === 'coins'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600'
                    : 'bg-purple-800 bg-opacity-50 hover:bg-opacity-70'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <DollarSign size={20} />
                  <span>DumbCoins</span>
                </div>
                <div className="text-xs mt-1">Balance: {dumbCoins}</div>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-purple-300 mb-2">
                Amount {donationType === 'ups' ? '(1 DumbsUp ≈ $0.01)' : '(1 DumbCoin ≈ $0.20)'}
              </label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-purple-800 bg-opacity-50 border border-purple-500 rounded-lg px-4 py-3 text-white text-lg"
                min="1"
              />
              <div className="flex gap-2 mt-3">
                {donationType === 'ups' 
                  ? [10, 25, 50, 100, 500].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className="flex-1 bg-purple-700 hover:bg-purple-600 py-2 rounded-lg text-sm font-bold transition"
                      >
                        {amount}
                      </button>
                    ))
                  : [5, 10, 25, 50, 100].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className="flex-1 bg-purple-700 hover:bg-purple-600 py-2 rounded-lg text-sm font-bold transition"
                      >
                        {amount}
                      </button>
                    ))
                }
              </div>
              <div className="text-sm text-purple-400 mt-2">
                ≈ ${donationType === 'ups' ? (donationAmount * 0.01).toFixed(2) : (donationAmount * 0.20).toFixed(2)} value
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleDonate(donationAmount, donationType)}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold"
              >
                Donate
              </button>
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DumbfundedApp;