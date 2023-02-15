import { useState, useEffect } from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { useUser, useSupabaseClient, Session } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
type Profiles = Database['public']['Tables']['profiles']['Row']

import Avatar from '../components/Avatar'

import Nav from '../layouts/Nav'

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username']>(null)
  const [website, setWebsite] = useState<Profiles['website']>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: Profiles['username']
    website: Profiles['website']
    avatar_url: Profiles['avatar_url']
  }) {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Row>
      <Col lg={2} xs={2}>
        <Avatar
        uid={user.id}
        url={avatar_url}
        size={90}
        onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
        }}
        />
      </Col>
      <Col lg={2} xs={2}>
      <div>
        {/*<label htmlFor="email">Email</label>*/}
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      </Col>
      <Col lg={2} xs={2}>
      <div>
         {/*<label htmlFor="username">Username</label>*/}
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      </Col>
       {/*
       <div>
       <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      */}
      <Col lg={2} xs={2}>
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      </Col>
      <Col lg={2} xs={2}>
      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      </Col>
      </Row>

    </div>
  )
}