import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Mic, MicOff, Volume2, VolumeX, Send, Download, User, Bot, Play, Pause, RotateCcw, Settings, Headphones, ChevronDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate, useLocation } from 'react-router-dom';
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  action?: string;
}

interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  messages: Message[];
  currentInput: string;
  voiceEnabled: boolean;
  webGLSupported: boolean;
  audioEnabled: boolean;
  voiceSpeed: number;
  voicePitch: number;
  voiceVolume: number;
  isPlaying: boolean;
  language: string;
}

// 3D Avatar Component
const Avatar3D: React.FC<{ 
  emotion: string; 
  isListening: boolean; 
  isSpeaking: boolean; 
  isThinking: boolean;
}> = ({ emotion, isListening, isSpeaking, isThinking }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  // Animation loop
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      if (meshRef.current) {
        // Breathing animation
        meshRef.current.scale.y = 1 + Math.sin(Date.now() * 0.003) * 0.02;
        
        // Floating animation
        meshRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
        
        // Rotation based on state
        if (isListening) {
          meshRef.current.rotation.y = Math.sin(Date.now() * 0.005) * 0.1;
        } else if (isThinking) {
          meshRef.current.rotation.x = Math.sin(Date.now() * 0.004) * 0.05;
        }
      }

      // Eye blinking
      if (eyeLeftRef.current && eyeRightRef.current) {
        const blinkTime = Date.now() * 0.01;
        if (Math.sin(blinkTime) > 0.98) {
          eyeLeftRef.current.scale.y = 0.1;
          eyeRightRef.current.scale.y = 0.1;
        } else {
          eyeLeftRef.current.scale.y = 1;
          eyeRightRef.current.scale.y = 1;
        }
      }

      // Mouth animation for speaking
      if (mouthRef.current && isSpeaking) {
        mouthRef.current.scale.x = 1 + Math.sin(Date.now() * 0.02) * 0.3;
      }

      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isListening, isSpeaking, isThinking]);

  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case 'happy': return '#4ade80';
      case 'excited': return '#f59e0b';
      case 'thinking': return '#8b5cf6';
      case 'confident': return '#06b6d4';
      case 'helpful': return '#ec4899';
      default: return '#3b82f6';
    }
  };

  return (
    <group>
      {/* Main head sphere */}
      <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={getEmotionColor(emotion)} 
          metalness={0.3} 
          roughness={0.2}
          emissive={getEmotionColor(emotion)}
          emissiveIntensity={isListening ? 0.3 : 0.1}
        />
      </Sphere>

      {/* Eyes */}
      <Sphere ref={eyeLeftRef} args={[0.15, 16, 16]} position={[-0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere ref={eyeRightRef} args={[0.15, 16, 16]} position={[0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>

      {/* Eye pupils */}
      <Sphere args={[0.08, 16, 16]} position={[-0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.3, 0.2, 0.9]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Mouth */}
      <Box ref={mouthRef} args={[0.4, 0.1, 0.1]} position={[0, -0.3, 0.8]}>
        <meshStandardMaterial color="#000000" />
      </Box>

      {/* Aura rings for listening state */}
      {isListening && (
        <>
          <mesh rotation={[0, 0, 0]}>
            <ringGeometry args={[1.5, 1.7, 32]} />
            <meshBasicMaterial color={getEmotionColor(emotion)} transparent opacity={0.3} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.3, 1.5, 32]} />
            <meshBasicMaterial color={getEmotionColor(emotion)} transparent opacity={0.2} />
          </mesh>
        </>
      )}

      {/* Thinking particles */}
      {isThinking && (
        <group>
          <Sphere args={[0.05, 8, 8]} position={[-0.5, 1.2, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.07, 8, 8]} position={[-0.2, 1.4, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
          <Sphere args={[0.09, 8, 8]} position={[0.1, 1.6, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Sphere>
        </group>
      )}

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
    </group>
  );
};

// Fallback 2D Avatar
const Avatar2D: React.FC<{ 
  emotion: string; 
  isListening: boolean; 
  isSpeaking: boolean; 
  isThinking: boolean;
}> = ({ emotion, isListening, isSpeaking, isThinking }) => {
  const getEmotionColor = (emotion: string): string => {
    switch (emotion) {
      case 'happy': return 'bg-green-400';
      case 'excited': return 'bg-yellow-400';
      case 'thinking': return 'bg-purple-400';
      case 'confident': return 'bg-cyan-400';
      case 'helpful': return 'bg-pink-400';
      default: return 'bg-blue-400';
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        className={`w-20 h-20 rounded-full ${getEmotionColor(emotion)} flex items-center justify-center`}
        animate={{
          scale: isListening ? [1, 1.1, 1] : isSpeaking ? [1, 1.05, 1] : 1,
          rotate: isThinking ? [0, 5, -5, 0] : 0,
        }}
        transition={{
          duration: isListening || isSpeaking ? 0.5 : isThinking ? 2 : 0,
          repeat: isListening || isSpeaking || isThinking ? Infinity : 0,
        }}
      >
        <Bot className="w-10 h-10 text-white" />
      </motion.div>
      
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {isThinking && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            className="flex space-x-1"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Voice Engine
class VoiceEngine {
  private recognition: any = null;
  private synthesis: SpeechSynthesis;
  private isListening = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    
    // Initialize speech recognition with better browser support
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;
      }
    }

    // Initialize Web Audio API with better browser support
    try {
      const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
      }
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }

  isVoiceRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  isSpeechSynthesisSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  startListening(onResult: (text: string) => void, onError: (error: string) => void): void {
    if (!this.recognition || this.isListening) {
      onError('Speech recognition not supported or already listening');
      return;
    }

    this.isListening = true;
    
    this.recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      onError(event.error || 'Speech recognition error');
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError('Failed to start speech recognition');
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      this.isListening = false;
    }
  }

  speak(text: string, options: { speed?: number; pitch?: number; volume?: number } = {}, onStart?: () => void, onEnd?: () => void): void {
    if (!this.isSpeechSynthesisSupported()) {
      console.warn('Speech synthesis not supported');
      onEnd?.();
      return;
    }

    this.synthesis.cancel();
    
    const cleanText = text
      .replace(/[🎉🚀✨🎊💼🌟⭐🔥💡🎯✅❌🎨🎭🎪🎨🎬🎵🎶🎸🎤🎧🎮🎲🎯🎪🎭🎨🎬🎵🎶🎸🎤🎧🎮🎲]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/https?:\/\/[^\s]+/g, '')
      .trim();

    if (!cleanText) {
      onEnd?.();
      return;
    }

    this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance.rate = options.speed || 0.9;
    this.currentUtterance.pitch = options.pitch || 1;
    this.currentUtterance.volume = options.volume || 0.8;

    this.currentUtterance.onstart = () => onStart?.();
    this.currentUtterance.onend = () => onEnd?.();
    this.currentUtterance.onerror = () => onEnd?.();

    try {
      this.synthesis.speak(this.currentUtterance);
    } catch (error) {
      console.error('Error speaking:', error);
      onEnd?.();
    }
  }

  stopSpeaking(): void {
    try {
      this.synthesis.cancel();
      this.currentUtterance = null;
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  pauseSpeaking(): void {
    try {
      if (this.synthesis.speaking) {
        this.synthesis.pause();
      }
    } catch (error) {
      console.error('Error pausing speech:', error);
    }
  }

  resumeSpeaking(): void {
    try {
      if (this.synthesis.paused) {
        this.synthesis.resume();
      }
    } catch (error) {
      console.error('Error resuming speech:', error);
    }
  }

  playNotificationSound(type: 'message' | 'error' | 'success' = 'message'): void {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      const frequencies = {
        message: [800, 600],
        error: [400, 300],
        success: [600, 800]
      };

      oscillator.frequency.setValueAtTime(frequencies[type][0], this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(frequencies[type][1], this.audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.2);
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }
}

// Portfolio AI Engine
class PortfolioAI {
  private scrollToSection: (sectionId: string) => void;

  constructor(scrollToSection: (sectionId: string) => void) {
    this.scrollToSection = scrollToSection;
  }

  private portfolioData = {
    personal: {
      name: "Harish Tandale",
      title: "Software & IoT Developer",
      education: "B.Tech in Internet of Things at PCE, Nagpur (2022-2026)",
      achievement: "Top 3 student in department",
      email: "harishtandale956@gmail.com",
      phone: "+91 7499636416",
      location: "Nagpur, Maharashtra, India"
    },
    skills: {
      frontend: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "Express", "MongoDB", "SQL"],
      iot: ["Arduino", "Raspberry Pi", "Python", "C/C++", "MQTT", "NodeMCU ESP8266/32"],
      tools: ["Git", "Docker", "AWS"]
    },
    projects: [
      {
        name: "Smart Home Automation System",
        description: "IoT-based smart home system with ESP32, MQTT, and React dashboard",
        tech: ["ESP32", "MQTT", "React", "Node.js", "MongoDB"]
      },
      {
        name: "Health Monitoring Wearable",
        description: "Wearable device for vital health parameters monitoring",
        tech: ["Arduino", "BLE", "React Native", "AWS", "TensorFlow"]
      },
      {
        name: "Smart Agriculture System",
        description: "IoT solution for precision farming and crop monitoring",
        tech: ["Raspberry Pi", "LoRaWAN", "Python", "TensorFlow", "React"]
      }
    ]
  };

  processMessage(message: string): { response: string; action?: string; emotion: string } {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return {
        response: `Hello! 👋 I'm ${this.portfolioData.personal.name}'s AI assistant. I can help you learn about my background, skills, projects, and experience. Try saying "Show me your projects" or "Tell me about your skills"!`,
        emotion: 'happy'
      };
    }

    // About/Personal Info
    if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('tell me about')) {
      return {
        response: `I'm ${this.portfolioData.personal.name}, a ${this.portfolioData.personal.title} currently pursuing ${this.portfolioData.personal.education}. I'm proud to be a ${this.portfolioData.personal.achievement} and passionate about creating innovative IoT solutions and web applications. Would you like to see my projects or learn about my skills?`,
        emotion: 'confident'
      };
    }

    // Skills
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
      const skillsText = `My technical expertise includes:
      
🌐 Frontend: ${this.portfolioData.skills.frontend.join(', ')}
⚙️ Backend: ${this.portfolioData.skills.backend.join(', ')}
🔗 IoT: ${this.portfolioData.skills.iot.join(', ')}
🛠️ Tools: ${this.portfolioData.skills.tools.join(', ')}`;
      
      return {
        response: skillsText,
        action: 'skills',
        emotion: 'excited'
      };
    }

    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      const projectsText = `Here are some of my key projects:

${this.portfolioData.projects.map((project, index) => 
  `${index + 1}. **${project.name}**: ${project.description}`
).join('\n\n')}`;
      
      return {
        response: projectsText,
        action: 'projects',
        emotion: 'excited'
      };
    }

    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return {
        response: `You can reach me at:
📧 Email: ${this.portfolioData.personal.email}
📱 Phone: ${this.portfolioData.personal.phone}
📍 Location: ${this.portfolioData.personal.location}

Would you like me to scroll to the contact section?`,
        action: 'contact',
        emotion: 'helpful'
      };
    }

    // Resume/CV
    if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('download')) {
      return {
        response: "I'd be happy to share my resume with you! You can download it directly or view my detailed experience online.",
        action: 'resume',
        emotion: 'helpful'
      };
    }

    // Default response
    return {
      response: "I'm Harish's portfolio assistant and I focus on helping you learn about his professional background, skills, projects, and experience. Please ask me about his work, education, technical skills, or how to contact him!",
      emotion: 'helpful'
    };
  }

  executeAction(action: string): void {
    switch (action) {
      case 'projects':
        this.scrollToSection('projects');
        break;
      case 'skills':
        this.scrollToSection('skills');
        break;
      case 'contact':
        this.scrollToSection('contact');
        break;
      case 'resume':
        this.downloadResume();
        break;
    }
  }

  private downloadResume(): void {
    // Create a simple resume download
    const resumeContent = `
HARISH TANDALE
Software & IoT Developer
Email: harishtandale956@gmail.com
Phone: +91 7499636416
Location: Nagpur, Maharashtra, India

EDUCATION
B.Tech in Internet of Things at PCE, Nagpur (2022-2026)
Achievement: Top 3 student in department

SKILLS
Frontend: HTML/CSS, JavaScript, React, TypeScript, Tailwind CSS
Backend: Node.js, Express, MongoDB, SQL
IoT: Arduino, Raspberry Pi, Python, C/C++, MQTT, NodeMCU ESP8266/32
Tools: Git, Docker, AWS

PROJECTS
1. Smart Home Automation System - IoT-based smart home system with ESP32, MQTT, and React dashboard
2. Health Monitoring Wearable - Wearable device for vital health parameters monitoring
3. Smart Agriculture System - IoT solution for precision farming and crop monitoring
    `;
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Harish_Tandale_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Main Chatbot Component
const Modern3DChatbot: React.FC = () => {
  const [state, setState] = useState<ChatbotState>({
    isOpen: false,
    isMinimized: false,
    isListening: false,
    isSpeaking: false,
    isThinking: false,
    messages: [],
    currentInput: '',
    voiceEnabled: true,
    webGLSupported: true,
    audioEnabled: true,
    voiceSpeed: 0.9,
    voicePitch: 1.0,
    voiceVolume: 0.8,
    isPlaying: false,
    language: 'en-US',
  });

  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [showSettings, setShowSettings] = useState(false);
  const voiceEngine = useRef<VoiceEngine | null>(null);
  const portfolioAI = useRef<PortfolioAI | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize engines
  useEffect(() => {
    voiceEngine.current = new VoiceEngine();
    portfolioAI.current = new PortfolioAI(scrollToSection);
    
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setState(prev => ({ ...prev, webGLSupported: !!gl }));
  }, []);

  // Scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.messages]);

  // Handle actions
  const handleAction = useCallback((action: string) => {
    if (portfolioAI.current) {
      portfolioAI.current.executeAction(action);
    }
    
    if (state.audioEnabled && voiceEngine.current) {
      voiceEngine.current.playNotificationSound('success');
    }
  }, [state.audioEnabled]);

  // Send message
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !portfolioAI.current) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      currentInput: '',
      isThinking: true
    }));

    if (state.audioEnabled && voiceEngine.current) {
      voiceEngine.current.playNotificationSound('message');
    }

    setTimeout(() => {
      if (!portfolioAI.current) return;
      
      const aiResponse = portfolioAI.current.processMessage(text);
      setCurrentEmotion(aiResponse.emotion);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.response,
        sender: 'bot',
        timestamp: new Date(),
        action: aiResponse.action
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isThinking: false,
        isSpeaking: true
      }));

      if (aiResponse.action) {
        setTimeout(() => handleAction(aiResponse.action!), 1000);
      }

      if (state.voiceEnabled && voiceEngine.current) {
        const voiceOptions = {
          speed: state.voiceSpeed,
          pitch: state.voicePitch,
          volume: state.voiceVolume
        };
        
        voiceEngine.current.speak(
          aiResponse.response,
          voiceOptions,
          () => setState(prev => ({ ...prev, isSpeaking: true, isPlaying: true })),
          () => setState(prev => ({ ...prev, isSpeaking: false, isPlaying: false }))
        );
      } else {
        setState(prev => ({ ...prev, isSpeaking: false }));
      }
    }, 1000);
  }, [state.audioEnabled, state.voiceEnabled, state.voiceSpeed, state.voicePitch, state.voiceVolume, handleAction]);

  // Voice input
  const startVoiceInput = useCallback(() => {
    if (!voiceEngine.current) return;

    if (!voiceEngine.current.isVoiceRecognitionSupported()) {
      alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    setState(prev => ({ ...prev, isListening: true }));
    setCurrentEmotion('thinking');

    if (state.audioEnabled) {
      voiceEngine.current.playNotificationSound('message');
    }

    voiceEngine.current.startListening(
      (text) => {
        setState(prev => ({ ...prev, isListening: false }));
        setCurrentEmotion('neutral');
        sendMessage(text);
      },
      (error) => {
        setState(prev => ({ ...prev, isListening: false }));
        setCurrentEmotion('neutral');
        if (state.audioEnabled && voiceEngine.current) {
          voiceEngine.current.playNotificationSound('error');
        }
        console.error('Voice recognition error:', error);
        alert(`Voice recognition error: ${error}. Please try again.`);
      }
    );
  }, [state.audioEnabled, sendMessage]);

  // Toggle chatbot
  const toggleChatbot = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
    
    if (state.audioEnabled && voiceEngine.current) {
      voiceEngine.current.playNotificationSound('message');
    }
    
    if (!state.isOpen && state.messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage: Message = {
          id: 'welcome',
          text: "Hello! I'm Harish's AI assistant. I can help you learn about his skills, projects, experience, and more. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        };
        setState(prev => ({ ...prev, messages: [welcomeMessage] }));
        setCurrentEmotion('happy');
      }, 500);
    }
  }, [state.audioEnabled, state.isOpen, state.messages.length]);

  // Voice control functions
  const pauseVoice = useCallback(() => {
    if (voiceEngine.current) {
      voiceEngine.current.pauseSpeaking();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const resumeVoice = useCallback(() => {
    if (voiceEngine.current) {
      voiceEngine.current.resumeSpeaking();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, []);

  const stopVoice = useCallback(() => {
    if (voiceEngine.current) {
      voiceEngine.current.stopSpeaking();
      setState(prev => ({ ...prev, isSpeaking: false, isPlaying: false }));
    }
  }, []);

  // Settings handlers
  const updateVoiceSettings = useCallback((setting: string, value: number) => {
    setState(prev => ({
      ...prev,
      [setting]: value
    }));
  }, []);

  // Toggle functions
  const toggleVoice = useCallback(() => {
    setState(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }));
  }, []);

  const toggleAudio = useCallback(() => {
    setState(prev => ({ ...prev, audioEnabled: !prev.audioEnabled }));
  }, []);

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
  }, []);

  const toggleMinimize = useCallback(() => {
    setState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  // Quick action buttons
  const quickActions = [
    { label: 'Projects', action: 'projects', icon: '🚀' },
    { label: 'Skills', action: 'skills', icon: '💻' },
    { label: 'Resume', action: 'resume', icon: '📄' },
    { label: 'Contact', action: 'contact', icon: '📧' }
  ];

  const handleQuickAction = useCallback((action: string) => {
    const responses = {
      projects: "Let me show you my amazing projects!",
      skills: "Here are my technical skills and expertise!",
      resume: "Downloading my resume for you!",
      contact: "Let's get in touch!"
    };
    
    sendMessage(responses[action as keyof typeof responses]);
  }, [sendMessage]);

  return (
    <>
      {/* Chat Bubble */}
      <AnimatePresence>
        {!state.isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChatbot}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-all duration-300"
          >
            <MessageCircle className="w-8 h-8" />
            {state.audioEnabled && (
              <Headphones className="w-4 h-4 absolute -top-1 -right-1 bg-green-500 rounded-full p-1" />
            )}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Window */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-[calc(20rem-5px)] md:max-w-[calc(28rem-5px)] lg:max-w-[calc(32rem-5px)] h-[650px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-lg bg-opacity-95 dark:bg-opacity-95"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-pulse"></div>
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative"
                    animate={{ 
                      boxShadow: state.isListening ? '0 0 20px rgba(255,255,255,0.5)' : '0 0 0px rgba(255,255,255,0)',
                      scale: state.isListening ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Bot className="w-6 h-6" />
                    {state.isListening && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Harish's AI Assistant</h3>
                    <p className="text-xs opacity-90">
                      <motion.span
                        key={state.isThinking ? 'thinking' : state.isSpeaking ? 'speaking' : state.isListening ? 'listening' : 'online'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {state.isThinking ? '🤔 Thinking...' : state.isSpeaking ? '🗣️ Speaking...' : state.isListening ? '👂 Listening...' : '🟢 Online'}
                      </motion.span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {/* Connection Status */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Minimize Button */}
                  <button
                    onClick={toggleMinimize}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Minimize"
                  >
                    <motion.div
                      animate={{ rotate: state.isMinimized ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  {/* Audio Toggle */}
                  <button
                    onClick={toggleAudio}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title={state.audioEnabled ? 'Disable Audio' : 'Enable Audio'}
                  >
                    <motion.div
                      animate={{ scale: state.audioEnabled ? 1 : 0.8, opacity: state.audioEnabled ? 1 : 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Headphones className={`w-4 h-4 ${state.audioEnabled ? 'text-green-300' : 'text-gray-300'}`} />
                    </motion.div>
                  </button>
                  
                  {/* Voice Toggle */}
                  <button
                    onClick={toggleVoice}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title={state.voiceEnabled ? 'Disable Voice' : 'Enable Voice'}
                  >
                    <motion.div
                      animate={{ scale: state.voiceEnabled ? 1 : 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      {state.voiceEnabled ? <Volume2 className="w-4 h-4 text-blue-300" /> : <VolumeX className="w-4 h-4 text-gray-300" />}
                    </motion.div>
                  </button>
                  
                  {/* Settings Toggle */}
                  <button
                    onClick={toggleSettings}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Settings"
                  >
                    <motion.div
                      animate={{ rotate: showSettings ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Settings className="w-4 h-4" />
                    </motion.div>
                  </button>
                  
                  {/* Close Button */}
                  <button
                    onClick={toggleChatbot}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Chatbot Content - Collapsible */}
            <AnimatePresence>
              {!state.isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Settings Panel */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Voice Settings</h4>
                          <button
                            onClick={() => {
                              setState(prev => ({
                                ...prev,
                                voiceSpeed: 0.9,
                                voicePitch: 1.0,
                                voiceVolume: 0.8
                              }));
                            }}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Reset to Default
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center">
                              <label className="text-xs text-gray-600 dark:text-gray-400">Speed</label>
                              <span className="text-xs font-mono text-gray-900 dark:text-white">{state.voiceSpeed.toFixed(1)}x</span>
                            </div>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={state.voiceSpeed}
                              onChange={(e) => updateVoiceSettings('voiceSpeed', parseFloat(e.target.value))}
                              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center">
                              <label className="text-xs text-gray-600 dark:text-gray-400">Pitch</label>
                              <span className="text-xs font-mono text-gray-900 dark:text-white">{state.voicePitch.toFixed(1)}x</span>
                            </div>
                            <input
                              type="range"
                              min="0.5"
                              max="2"
                              step="0.1"
                              value={state.voicePitch}
                              onChange={(e) => updateVoiceSettings('voicePitch', parseFloat(e.target.value))}
                              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center">
                              <label className="text-xs text-gray-600 dark:text-gray-400">Volume</label>
                              <span className="text-xs font-mono text-gray-900 dark:text-white">{Math.round(state.voiceVolume * 100)}%</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.1"
                              value={state.voiceVolume}
                              onChange={(e) => updateVoiceSettings('voiceVolume', parseFloat(e.target.value))}
                              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>
                          
                          {/* Language Selection */}
                          <div>
                            <label className="text-xs text-gray-600 dark:text-gray-400 block mb-1">Language</label>
                            <select
                              value={state.language}
                              onChange={(e) => setState(prev => ({ ...prev, language: e.target.value }))}
                              className="w-full text-xs p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="en-US">English (US)</option>
                              <option value="en-GB">English (UK)</option>
                              <option value="en-AU">English (AU)</option>
                              <option value="en-IN">English (IN)</option>
                            </select>
                          </div>
                        </div>
                        
                        {/* Voice Controls */}
                        {state.isSpeaking && (
                          <div className="flex items-center justify-center space-x-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <button
                              onClick={state.isPlaying ? pauseVoice : resumeVoice}
                              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                              title={state.isPlaying ? 'Pause' : 'Resume'}
                            >
                              {state.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={stopVoice}
                              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                              title="Stop"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* 3D Avatar Section */}
                  <div className="h-36 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 flex items-center justify-center relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
                    </div>
                    
                    {state.webGLSupported ? (
                      <Suspense fallback={
                        <Avatar2D 
                          emotion={currentEmotion}
                          isListening={state.isListening}
                          isSpeaking={state.isSpeaking}
                          isThinking={state.isThinking}
                        />
                      }>
                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                          <Avatar3D 
                            emotion={currentEmotion}
                            isListening={state.isListening}
                            isSpeaking={state.isSpeaking}
                            isThinking={state.isThinking}
                          />
                          <OrbitControls enableZoom={false} enablePan={false} />
                        </Canvas>
                      </Suspense>
                    ) : (
                      <Avatar2D 
                        emotion={currentEmotion}
                        isListening={state.isListening}
                        isSpeaking={state.isSpeaking}
                        isThinking={state.isThinking}
                      />
                    )}
                    
                    {/* Status Indicators */}
                    <div className="absolute top-2 left-2 flex space-x-1">
                      {state.voiceEnabled && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Voice Enabled"></div>
                      )}
                      {state.audioEnabled && (
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" title="Audio Enabled"></div>
                      )}
                      {state.webGLSupported && (
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" title="3D Enabled"></div>
                      )}
                    </div>
                    
                    {/* Audio Visualizer */}
                    {state.isSpeaking && state.audioEnabled && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-blue-500 rounded-full"
                            animate={{ 
                              height: [4, Math.random() * 16 + 4, 4],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                              duration: 0.5 + Math.random() * 0.5, 
                              repeat: Infinity, 
                              delay: i * 0.1 
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Emotion Indicator */}
                    <div className="absolute top-2 right-2">
                      <motion.div
                        className="text-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {currentEmotion === 'happy' && '😊'}
                        {currentEmotion === 'excited' && '🤩'}
                        {currentEmotion === 'thinking' && '🤔'}
                        {currentEmotion === 'confident' && '😎'}
                        {currentEmotion === 'helpful' && '🤝'}
                        {currentEmotion === 'neutral' && '🤖'}
                      </motion.div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
                      {quickActions.map((action) => (
                        <motion.button
                          key={action.action}
                          onClick={() => handleQuickAction(action.action)}
                          className="flex-shrink-0 px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800 dark:hover:to-purple-800 transition-all duration-200 shadow-sm border border-blue-200 dark:border-blue-700"
                          whileHover={{ scale: 1.05, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-1">{action.icon}</span>
                          {action.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 h-72 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    {state.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <motion.div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-gray-600 to-gray-700'}`}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {message.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                          </motion.div>
                          <div className={`p-3 rounded-2xl shadow-md backdrop-blur-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'}`}>
                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                            <div className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            {message.action && (
                              <motion.button
                                onClick={() => handleAction(message.action!)}
                                className="mt-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                {message.action === 'resume' && <Download className="w-3 h-3 inline mr-1" />}
                                {message.action === 'projects' && <span className="mr-1">🚀</span>}
                                {message.action === 'skills' && <span className="mr-1">💻</span>}
                                {message.action === 'contact' && <span className="mr-1">📧</span>}
                                {message.action.charAt(0).toUpperCase() + message.action.slice(1)}
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={state.currentInput}
                        onChange={(e) => setState(prev => ({ ...prev, currentInput: e.target.value }))}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage(state.currentInput)}
                        placeholder={state.isListening ? "Listening..." : "Ask me about Harish's skills, projects, or experience..."}
                        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-inner backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 transition-all duration-200"
                        disabled={state.isThinking}
                      />
                      
                      <motion.button
                        onClick={startVoiceInput}
                        disabled={state.isListening || state.isThinking}
                        className={`p-3 rounded-xl transition-all duration-200 relative shadow-lg ${state.isListening ? 'bg-gradient-to-r from-red-600 to-red-700 text-white animate-pulse' : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={state.isListening ? 'Stop Listening' : 'Start Voice Input'}
                      >
                        {state.isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        {state.voiceEnabled && !state.isListening && voiceEngine.current?.isVoiceRecognitionSupported() && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => sendMessage(state.currentInput)}
                        disabled={!state.currentInput.trim() || state.isThinking}
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative shadow-lg"
                        whileHover={{ scale: state.currentInput.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: state.currentInput.trim() ? 0.95 : 1 }}
                        title="Send Message"
                      >
                        <Send className="w-5 h-5" />
                        {state.isThinking && (
                          <motion.div
                            className="absolute inset-0 border-2 border-white/50 rounded-xl"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </motion.button>
                    </div>
                    
                    {/* Typing Indicator */}
                    {state.isThinking && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 h-1 bg-blue-500 rounded-full"
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                        <span>AI is thinking...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modern3DChatbot;