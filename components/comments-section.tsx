"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, ThumbsUp, ThumbsDown, Reply, Flag, MoreHorizontal, Star, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  dislikes: number
  rating?: number
  replies: Comment[]
  isVerified?: boolean
}

interface CommentsSectionProps {
  appName: string
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40&text=JS",
    content:
      "This app is amazing! I've been using it for months and it never crashes. The interface is clean and intuitive. Highly recommended for anyone looking for a reliable messaging app.",
    timestamp: "2 hours ago",
    likes: 24,
    dislikes: 2,
    rating: 5,
    isVerified: true,
    replies: [
      {
        id: "1-1",
        author: "Sarah Wilson",
        avatar: "/placeholder.svg?height=40&width=40&text=SW",
        content: "I agree! The new update made it even better.",
        timestamp: "1 hour ago",
        likes: 8,
        dislikes: 0,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "Mike Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    content: "Good app overall but sometimes it takes a while to load messages. Hope they fix this in the next update.",
    timestamp: "5 hours ago",
    likes: 12,
    dislikes: 3,
    rating: 4,
    replies: [],
  },
  {
    id: "3",
    author: "Emma Davis",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    content:
      "Love the new features! The voice messages are crystal clear and the group chat functionality is perfect for my family.",
    timestamp: "1 day ago",
    likes: 18,
    dislikes: 1,
    rating: 5,
    replies: [
      {
        id: "3-1",
        author: "Alex Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=AC",
        content: "The voice quality is indeed impressive!",
        timestamp: "20 hours ago",
        likes: 5,
        dislikes: 0,
        replies: [],
      },
      {
        id: "3-2",
        author: "Lisa Brown",
        avatar: "/placeholder.svg?height=40&width=40&text=LB",
        content: "How do you enable the new voice features?",
        timestamp: "18 hours ago",
        likes: 2,
        dislikes: 0,
        replies: [],
      },
    ],
  },
]

export function CommentsSection({ appName }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState<number>(5)
  const [sortBy, setSortBy] = useState("newest")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40&text=YU",
      content: newComment,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      rating: newRating,
      replies: [],
    }

    setComments([comment, ...comments])
    setNewComment("")
    setNewRating(5)
  }

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40&text=YU",
      content: replyContent,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      replies: [],
    }

    setComments(
      comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, reply] }
        }
        return comment
      }),
    )

    setReplyContent("")
    setReplyingTo(null)
  }

  const handleLike = (commentId: string, isReply = false, parentId?: string) => {
    setComments(
      comments.map((comment) => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
            ),
          }
        } else if (comment.id === commentId) {
          return { ...comment, likes: comment.likes + 1 }
        }
        return comment
      }),
    )
  }

  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      case "most-liked":
        return b.likes - a.likes
      case "highest-rated":
        return (b.rating || 0) - (a.rating || 0)
      default: // newest
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
  })

  const CommentComponent = ({
    comment,
    isReply = false,
    parentId,
  }: { comment: Comment; isReply?: boolean; parentId?: string }) => (
    <div className={`space-y-3 ${isReply ? "ml-12 border-l-2 border-muted pl-4" : ""}`}>
      <div className="flex items-start space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
          <AvatarFallback>
            {comment.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">{comment.author}</span>
            {comment.isVerified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {comment.timestamp}
            </span>
            {comment.rating && (
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < comment.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{comment.content}</p>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={() => handleLike(comment.id, isReply, parentId)}
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              {comment.likes}
            </Button>

            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
              <ThumbsDown className="h-3 w-3 mr-1" />
              {comment.dislikes}
            </Button>

            {!isReply && (
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => setReplyingTo(comment.id)}>
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className="ml-12 space-y-3">
          <Textarea
            placeholder={`Reply to ${comment.author}...`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => handleSubmitReply(comment.id)}>
              Post Reply
            </Button>
            <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentComponent key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Reviews & Comments ({comments.length})
          </CardTitle>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="most-liked">Most Liked</SelectItem>
              <SelectItem value="highest-rated">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Add Comment Form */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Rate {appName}:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setNewRating(star)} className="p-1">
                  <Star
                    className={`h-4 w-4 ${star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            placeholder={`Share your experience with ${appName}...`}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />

          <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </div>

        <Separator />

        {/* Comments List */}
        <div className="space-y-6">
          {sortedComments.map((comment) => (
            <CommentComponent key={comment.id} comment={comment} />
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No comments yet. Be the first to share your experience!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
