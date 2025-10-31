
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getAppSettings, updateAppSettings } from '../../services/firebase';
import { AppSettings } from '../../types';

const AdminSettings: React.FC = () => {
    const [settings, setSettings] = useState<AppSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        getAppSettings().then(data => {
            setSettings(data);
            setLoading(false);
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (settings) {
            setSettings({
                ...settings,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (settings) {
            setSaving(true);
            await updateAppSettings(settings);
            setSaving(false);
            // In a real app, show a success toast
            alert("Settings saved successfully!");
        }
    };
    
    if (loading || !settings) {
        return <div>Loading settings...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Application Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Update general information for the portal.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label htmlFor="schoolName" className="block text-sm font-medium mb-1">School Name</label>
                            <input
                                type="text"
                                id="schoolName"
                                name="schoolName"
                                value={settings.schoolName}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md bg-transparent dark:border-gray-600"
                            />
                        </div>
                        <div>
                            <label htmlFor="whatsappInviteUrl" className="block text-sm font-medium mb-1">WhatsApp Invite URL</label>
                            <input
                                type="url"
                                id="whatsappInviteUrl"
                                name="whatsappInviteUrl"
                                value={settings.whatsappInviteUrl}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md bg-transparent dark:border-gray-600"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminSettings;
